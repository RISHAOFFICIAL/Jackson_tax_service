import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Users, CheckCircle, XCircle, Video, MessageCircle, Award,
  BookOpen, BarChart3, LogOut, Loader2, Search, Trash2, Shield,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useAuth } from "../lib/auth";
import { getTrpcClient } from "../lib/trpc-client";

interface Student {
  id: number;
  name: string;
  email: string;
  studentApprovalStatus: string;
  createdAt: string;
  lastSignedIn: string | null;
}

interface Video {
  videoId: string;
  title: string;
  description: string | null;
  url: string;
  bundleId: string | null;
  orderIndex: number;
}

interface Comment {
  id: number;
  userId: number;
  videoId: string;
  comment: string;
  approved: boolean;
  createdAt: string;
  userName?: string;
}

interface Bundle {
  bundleId: string;
  name: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isAdmin, user, logout, token } = useAuth();

  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState<Student[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    } else if (!isAdmin) {
      setLocation("/student-portal");
    }
  }, [isAuthenticated, isAdmin, setLocation]);

  // Fetch all admin data
  useEffect(() => {
    if (!isAdmin || !token) return;

    const fetchAll = async () => {
      setLoading(true);
      try {
        const client = getTrpcClient(token);
        const [studs, vids, cmts, buns] = await Promise.all([
          client.admin.getAllStudents.query(),
          client.admin.getAllVideos.query(),
          client.admin.getAllComments.query(),
          client.public.getBundles.query(),
        ]);
        setStudents(studs as Student[]);
        setVideos(vids as Video[]);
        setComments(cmts as Comment[]);
        setBundles(buns as Bundle[]);
      } catch (err: any) {
        setError(err.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [isAdmin, token]);

  const handleApprove = async (userId: number) => {
    if (!token) return;
    try {
      const client = getTrpcClient(token);
      await client.admin.approveStudent.mutate({ userId });
      setStudents((prev) =>
        prev.map((s) =>
          s.id === userId ? { ...s, studentApprovalStatus: "approved" } : s
        )
      );
    } catch (err: any) {
      console.error("Failed to approve:", err);
    }
  };

  const handleReject = async (userId: number) => {
    if (!token) return;
    try {
      const client = getTrpcClient(token);
      await client.admin.rejectStudent.mutate({ userId });
      setStudents((prev) =>
        prev.map((s) =>
          s.id === userId ? { ...s, studentApprovalStatus: "rejected" } : s
        )
      );
    } catch (err: any) {
      console.error("Failed to reject:", err);
    }
  };

  const handleApproveComment = async (commentId: number) => {
    if (!token) return;
    try {
      const client = getTrpcClient(token);
      await client.admin.approveComment.mutate({ commentId });
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, approved: true } : c
        )
      );
    } catch {}
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!token) return;
    try {
      const client = getTrpcClient(token);
      await client.admin.deleteComment.mutate({ commentId });
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch {}
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: "students", label: "Students", icon: Users },
    { id: "videos", label: "Videos", icon: Video },
    { id: "comments", label: "Comments", icon: MessageCircle },
    { id: "certificates", label: "Certificates", icon: Award },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { logout(); setLocation("/"); }}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Students Tab */}
        {activeTab === "students" && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{student.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            student.studentApprovalStatus === "approved"
                              ? "bg-green-100 text-green-700"
                              : student.studentApprovalStatus === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {student.studentApprovalStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            {student.studentApprovalStatus !== "approved" && (
                              <button
                                onClick={() => handleApprove(student.id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                title="Approve"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                            )}
                            {student.studentApprovalStatus !== "rejected" && (
                              <button
                                onClick={() => handleReject(student.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Reject"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredStudents.length === 0 && (
                <p className="text-center text-gray-500 py-8">No students found.</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.videoId} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <Video className="w-8 h-8 text-gold" />
                      <div>
                        <p className="font-medium text-primary">{video.title}</p>
                        <p className="text-sm text-gray-500">
                          Bundle: {bundles.find((b) => b.bundleId === video.bundleId)?.name || "None"}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">ID: {video.videoId}</span>
                  </div>
                ))}
                {videos.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No videos yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comments Tab */}
        {activeTab === "comments" && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {comment.userName || "Unknown"} - <span className="text-gray-500">on video {comment.videoId}</span>
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {!comment.approved && (
                          <button
                            onClick={() => handleApproveComment(comment.id)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{comment.comment}</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span>{new Date(comment.createdAt).toLocaleString()}</span>
                      <span className="mx-2">•</span>
                      <span className={comment.approved ? "text-green-600" : "text-yellow-600"}>
                        {comment.approved ? "Approved" : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No comments yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Certificate Management</h3>
                <p className="text-gray-500 mb-6">
                  Issue certificates to students who complete their course bundles.
                </p>
                <p className="text-sm text-gray-400">
                  Select a student and bundle to issue a certificate.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}