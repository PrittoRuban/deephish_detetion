"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { supabase } from "@/lib/supabaseClient";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Clock,
  Loader,
  Lock,
  Mail,
  Github,
  Eye,
  EyeOff,
  LogOut,
  ArrowLeft,
} from "lucide-react";

export function SecuritySettings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  // In the useEffect function

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);

        // Get session data
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        console.log("Session check:", {
          hasSession: !!session,
          error: sessionError,
        });

        if (sessionError) {
          throw sessionError;
        }

        // IMPORTANT: Fix the redirect URL to match your routes
        if (!session) {
          router.push("/auth/signin"); // Changed from "/auth/login"
          return;
        }

        // Get the user with their identities
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        setUser(userData.user);

        // Set sessions
        setSessions([
          {
            id: session.access_token,
            user_agent: navigator.userAgent,
            created_at: session.created_at,
            current_session: true,
          },
        ]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear errors when typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: "",
      });
    }

    // Clear success message when user starts typing
    if (formSuccess) {
      setFormSuccess("");
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setProcessing(true);
      setFormErrors({});
      setFormSuccess("");

      // Update password using supabase
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (error) {
        throw error;
      }

      // Clear form and show success message
      setFormData({
        currentPassword: "",
        newPassword: "",
      });

      setFormSuccess("Your password has been updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      setFormErrors({
        form: error.message || "Unable to update password. Please try again.",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleLogoutAllSessions = async () => {
    try {
      setProcessing(true);

      // Sign out from all devices
      const { error } = await supabase.auth.signOut({ scope: "global" });

      if (error) {
        throw error;
      }

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Error signing out from all devices:", error);
    } finally {
      setProcessing(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getDeviceIcon = (userAgent) => {
    if (/android/i.test(userAgent)) {
      return <Globe className="w-5 h-5" />;
    } else if (/iphone|ipad/i.test(userAgent)) {
      return <Globe className="w-5 h-5" />;
    } else {
      return <Globe className="w-5 h-5" />;
    }
  };

  const getProviderIcons = (providers) => {
    const icons = [];
    if (providers.includes("google")) {
      icons.push(<Mail key="google" className="w-5 h-5 mr-2" />);
    }
    if (providers.includes("github")) {
      icons.push(<Github key="github" className="w-5 h-5 mr-2" />);
    }
    if (providers.includes("email")) {
      icons.push(<Mail key="email" className="w-5 h-5 mr-2" />);
    }
    return icons;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="w-8 h-8 animate-spin text-neutral-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12"
      >
        <motion.div variants={itemVariants} className="mb-6 flex items-center">
          <button
            onClick={() => router.push("/profile")}
            className="mr-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 p-1">
              Security Settings
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Manage your account security and authentication
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Authentication Methods */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <BackgroundGradient className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-full">
              <div className="p-8 relative z-10">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 filter blur-xl -z-10"></div>

                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Authentication Methods
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Email Authentication */}
                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="font-medium text-neutral-900 dark:text-white">
                          Email Authentication
                        </h4>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                      Your account is connected with email: {user?.email}
                    </p>

                    {user?.app_metadata?.provider === "email" && (
                      <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                        <h5 className="text-sm font-medium text-neutral-900 dark:text-white mb-3">
                          Change Password
                        </h5>

                        {formSuccess && (
                          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg flex items-center dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            {formSuccess}
                          </div>
                        )}

                        {formErrors.form && (
                          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center dark:bg-red-900/30 dark:border-red-800 dark:text-red-300">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            {formErrors.form}
                          </div>
                        )}

                        <form onSubmit={handlePasswordUpdate}>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                              Current Password
                            </label>
                            <div className="relative">
                              <input
                                type={showCurrentPassword ? "text" : "password"}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                  formErrors.currentPassword
                                    ? "border-red-300 dark:border-red-700"
                                    : "border-neutral-200 dark:border-neutral-700"
                                } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {formErrors.currentPassword && (
                              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {formErrors.currentPassword}
                              </p>
                            )}
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                              New Password
                            </label>
                            <div className="relative">
                              <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                  formErrors.newPassword
                                    ? "border-red-300 dark:border-red-700"
                                    : "border-neutral-200 dark:border-neutral-700"
                                } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                              >
                                {showNewPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {formErrors.newPassword && (
                              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {formErrors.newPassword}
                              </p>
                            )}
                          </div>

                          <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                          >
                            {processing ? (
                              <Loader className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <Lock className="w-4 h-4 mr-2" />
                            )}
                            Update Password
                          </button>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* Social Authentication */}
                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="font-medium text-neutral-900 dark:text-white">
                          Social Authentication
                        </h4>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Google Auth */}
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-neutral-700 dark:text-neutral-300">
                            Google Account
                          </span>
                        </div>
                        {user?.identities?.some(
                          (identity) => identity.provider === "google"
                        ) ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" /> Connected
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400 flex items-center">
                            <XCircle className="w-3 h-3 mr-1" /> Not Connected
                          </span>
                        )}
                      </div>

                      {/* GitHub Auth */}
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <Github className="w-5 h-5 text-neutral-900 dark:text-white mr-2" />
                          <span className="text-neutral-700 dark:text-neutral-300">
                            GitHub Account
                          </span>
                        </div>
                        {user?.identities?.some(
                          (identity) => identity.provider === "github"
                        ) ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" /> Connected
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400 flex items-center">
                            <XCircle className="w-3 h-3 mr-1" /> Not Connected
                          </span>
                        )}
                      </div>

                      {/* Email Auth */}
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-blue-500 mr-2" />
                          <span className="text-neutral-700 dark:text-neutral-300">
                            Email & Password
                          </span>
                        </div>
                        {user?.identities?.some(
                          (identity) => identity.provider === "email"
                        ) ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" /> Connected
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400 flex items-center">
                            <XCircle className="w-3 h-3 mr-1" /> Not Connected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>

          {/* Active Sessions */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <BackgroundGradient className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-full">
              <div className="p-8 relative z-10">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 filter blur-xl -z-10"></div>

                <div className="flex items-center mb-6">
                  <Clock className="w-6 h-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Active Sessions
                  </h3>
                </div>

                <div className="space-y-4">
                  {sessions.map((session, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {getDeviceIcon(session?.user_agent)}
                          <span className="ml-2 text-sm font-medium text-neutral-900 dark:text-white">
                            {session?.user_agent?.split(" ")[0] ||
                              "Unknown Device"}
                          </span>
                        </div>
                        {session?.current_session && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Last active: {formatTimestamp(session?.created_at)}
                      </p>
                    </div>
                  ))}

                  <div className="mt-6">
                    <button
                      onClick={handleLogoutAllSessions}
                      disabled={processing}
                      className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                    >
                      {processing ? (
                        <Loader className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <LogOut className="w-4 h-4 mr-2" />
                      )}
                      Sign Out of All Devices
                    </button>
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>

          {/* Security Activity */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <BackgroundGradient className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <div className="p-8 relative z-10">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 filter blur-xl -z-10"></div>

                <div className="flex items-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-amber-500 mr-2" />
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Security Recommendations
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white mb-1">
                          Use a Strong Password
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Use a strong, unique password with a mix of letters,
                          numbers, and symbols.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white mb-1">
                          Enable Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Add an extra layer of security to your account by
                          enabling two-factor authentication.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white mb-1">
                          Regularly Review Your Security Settings
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Periodically check your account for any suspicious
                          activity and keep your security settings updated.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
