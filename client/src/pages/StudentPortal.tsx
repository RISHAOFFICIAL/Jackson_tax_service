import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  GraduationCap, PlayCircle, CheckCircle, Clock, MessageCircle,
  ThumbsUp, Award, BookOpen, ChevronRight, X, Send, Loader2,
  Youtube,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { useAuth } from "../lib/auth";
import { getTrpcClient } from "../lib/trpc-client";

// Types
interface Video {
  id: number;
  videoId: string;
  title: string;
  description: string | null;
  url: string;
  platform: string;
  bundleId: string | null;
  duration: number | null;
  thumbnailUrl: string | null;
  orderIndex: number;
  isPublic: boolean;
}

interface Bundle {
  id: number;
  bundleId: string;
  name: string;
  description: string | null;
  thumbnailUrl: string | null;
  orderIndex: number;
}

interface Progress {
  videoId: string;
  completed: boolean;
  lastWatchedAt: string | null;
}

interface Comment {
  id: number;
  userId: number;
  videoId: string;
  comment: string;
  approved: boolean;
  parentCommentId: number | null;
  createdAt: string;
  user?: { name: string; avatar: string | null };
}

interface Certificate {
  id: number;
  bundleName: string;
  issuedAt: string;
  certificateUrl: string | null;
}

interface QuizResult {
  id: number;
  quizId: number;
  score: number;
  passed: boolean;
}

export default function StudentPortal() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, user, token } = useAuth();

  const [videos, setVideos] = useState<Video[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeBundle, setActiveBundle] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [sendingComment, setSendingComment] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  // Fetch data
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const client = getTrpcClient(token);
        const [vids, bun, prog, certs] = await Promise.all([
          client.protected.getAllVideos.query(),
          client.public.getBundles.query(),
          client.protected.getStudentProgress.query(),
          client.protected.getCertificates.query(),
        ]);
        setVideos(vids as Video[]);
        setBundles(bun as Bundle[]);
        setProgress(prog as any);
        setCertificates(certs as Certificate[]);
        setOverallProgress((prog as any).overallProgress || 0);

        // Get quiz results
        try {
          const qResults = await client.protected.getQuizResults.query();
          setQuizResults(qResults as QuizResult[]);
        } catch {}
      } catch (err: any) {
        setError(err.message || "Failed to load portal data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated, token]);

  const getProgressForVideo = (videoId: string) => {
    return progress.find((p) => p.videoId === videoId);
  };

  const handleMarkComplete = async (videoId: string, completed: boolean) => {
    if (!token) return;
    try {
      const client = getTrpcClient(token);
      await client.protected.markVideoComplete.mutate({ videoId, completed });

      // Refresh progress
      const prog = await client.protected.getStudentProgress.query();
      setProgress(prog as any);
      setOverallProgress((prog as any).overallProgress || 0);
    } catch (err: any) {
      console.error("Failed to update progress:", err);
    }
  };

  const handleAddComment = async () => {
    if (!token || !selectedVideo || !commentText.trim()) return;
    setSendingComment(true);
    try {
      const client = getTrpcClient(token);
      await client.protected.addVideoComment.mutate({
        videoId: selectedVideo.videoId,
        videoTitle: selectedVideo.title,
        comment: commentText.trim(),
      });
      setCommentText("");
      // Refresh comments
      const cmts = await client.protected.getVideoComments.query({
        videoId: selectedVideo.videoId,
      });
      setComments(cmts as Comment[]);
    } catch (err: any) {
      console.error("Failed to add comment:", err);
    } finally {
      setSendingComment(false);
    }
  };

  const handleUpvote = async (commentId: number) => {
    if (!token) return;
    try {
      const client = getTrpcClient(token);
      await client.protected.upvoteComment.mutate({ commentId });
    } catch (err: any) {
      console.error("Failed to upvote:", err);
    }
  };

  const loadComments = async (videoId: string) => {
    if (!token) return;
    try {
      const client = getTrpcClient(token);
      const cmts = await client.protected.getVideoComments.query({ videoId });
      setComments(cmts as Comment[]);
    } catch {}
  };

  const filteredVideos = activeBundle
    ? videos.filter((v) => v.bundleId === activeBundle)
    : videos;

  const completedVideos = progress.filter((p) => p.completed).length;

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Student Portal</h1>
            <p className="text-gray-500">Welcome, {user?.name}</p>
          </div>
        </div>

        {/* Progress Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <PlayCircle className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{completedVideos}/{videos.length}</p>
              <p className="text-sm text-gray-500">Videos Watched</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                    stroke="currentColor"
                  />
                  <path
                    className="text-gold"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${overallProgress} 100`}
                    d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                    stroke="currentColor"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">
                  {overallProgress}%
                </span>
              </div>
              <p className="text-sm text-gray-500">Overall Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{certificates.length}</p>
              <p className="text-sm text-gray-500">Certificates</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{bundles.length}</p>
              <p className="text-sm text-gray-500">Course Bundles</p>
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Library */}
          <div className="lg:col-span-2">
            {/* Bundle Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveBundle(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  !activeBundle
                    ? "bg-gold text-primary"
                    : "bg-white text-gray-600 hover:bg-gray-100 border"
                }`}
              >
                All Videos
              </button>
              {bundles.map((bundle) => (
                <button
                  key={bundle.bundleId}
                  onClick={() => setActiveBundle(bundle.bundleId)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeBundle === bundle.bundleId
                      ? "bg-gold text-primary"
                      : "bg-white text-gray-600 hover:bg-gray-100 border"
                  }`}
                >
                  {bundle.name}
                </button>
              ))}
            </div>

            {/* Video List */}
            <div className="space-y-4">
              {filteredVideos.map((video) => {
                const videoProg = getProgressForVideo(video.videoId);
                return (
                  <Card
                    key={video.videoId}
                    className={`cursor-pointer hover:shadow-lg transition-shadow ${
                      selectedVideo?.videoId === video.videoId ? "ring-2 ring-gold" : ""
                    }`}
                    onClick={() => {
                      setSelectedVideo(video);
                      loadComments(video.videoId);
                    }}
                  >
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        {videoProg?.completed ? (
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        ) : (
                          <PlayCircle className="w-8 h-8 text-gold" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-primary truncate">{video.title}</h3>
                        {video.description && (
                          <p className="text-sm text-gray-500 truncate">{video.description}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-1">
                          {video.duration && (
                            <span className="text-xs text-gray-400 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {Math.floor(video.duration / 60)} min
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            {videoProg?.completed ? "✓ Completed" : "Not started"}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </CardContent>
                  </Card>
                );
              })}
              {filteredVideos.length === 0 && (
                <p className="text-center text-gray-500 py-8">No videos in this bundle yet.</p>
              )}
            </div>
          </div>

          {/* Video Player & Comments Panel */}
          <div className="lg:col-span-1">
            {selectedVideo ? (
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-black rounded-t-xl">
                      <iframe
                        src={selectedVideo.url}
                        className="w-full h-full rounded-t-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={selectedVideo.title}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-primary mb-2">{selectedVideo.title}</h3>
                      {selectedVideo.description && (
                        <p className="text-sm text-gray-500 mb-4">{selectedVideo.description}</p>
                      )}
                      <div className="flex space-x-2">
                        <Button
                          variant={getProgressForVideo(selectedVideo.videoId)?.completed ? "secondary" : "gold"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkComplete(
                              selectedVideo.videoId,
                              !getProgressForVideo(selectedVideo.videoId)?.completed
                            );
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {getProgressForVideo(selectedVideo.videoId)?.completed
                            ? "Completed"
                            : "Mark as Watched"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments */}
                <Card>
                  <CardHeader>
                    <h3 className="font-bold text-primary flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2 text-gold" />
                      Comments & Questions
                    </h3>
                  </CardHeader>
                  <CardContent className="p-4">
                    {/* Add comment */}
                    <div className="flex space-x-2 mb-4">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Ask a question or leave a comment..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                      />
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={handleAddComment}
                        disabled={sendingComment || !commentText.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Comment list */}
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-primary">
                              {comment.user?.name || "Student"}
                            </span>
                            <button
                              onClick={() => handleUpvote(comment.id)}
                              className="text-gray-400 hover:text-gold transition"
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600">{comment.comment}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                      {comments.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4">
                          No comments yet. Be the first to ask a question!
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <PlayCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-primary mb-2">Select a Video</h3>
                  <p className="text-sm text-gray-500">
                    Choose a video from the library to start learning.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Certificates */}
            {certificates.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <h3 className="font-bold text-primary flex items-center">
                    <Award className="w-5 h-5 mr-2 text-gold" />
                    Your Certificates
                  </h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-3 bg-gold/5 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-primary">{cert.bundleName}</p>
                          <p className="text-xs text-gray-500">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                        </div>
                        <Award className="w-6 h-6 text-gold" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}