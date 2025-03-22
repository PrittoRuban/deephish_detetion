// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { BackgroundGradient } from "@/components/ui/background-gradient";
// import { supabase } from "@/lib/supabaseClient";
// import {
//   User,
//   Settings,
//   Mail,
//   Github,
//   LogOut,
//   Edit,
//   Save,
//   Camera,
//   Loader,
//   Google,
//   Globe,
// } from "lucide-react";

// export function MyProfile() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     full_name: "",
//     avatar_url: "",
//     email: "",
//     providers: [],
//   });
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     async function getUser() {
//       try {
//         setLoading(true);

//         // Get session data
//         const {
//           data: { session },
//           error: sessionError,
//         } = await supabase.auth.getSession();

//         if (sessionError) {
//           throw sessionError;
//         }

//         if (!session) {
//           router.push("/auth/signup");
//           return;
//         }

//         // Get user profile data
//         const { data: profile, error: profileError } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", session.user.id)
//           .single();

//         if (profileError && profileError.code !== "PGRST116") {
//           throw profileError;
//         }

//         // Get complete user object with metadata
//         const { data: userData, error: userError } =
//           await supabase.auth.getUser();

//         if (userError) {
//           throw userError;
//         }

//         const providers = userData.user?.app_metadata?.providers || [
//           userData.user?.app_metadata?.provider || "email",
//         ];

//         const fullUserData = {
//           id: session.user.id,
//           email: session.user.email,
//           providers: providers,
//           provider: providers[0] || "email", // Primary provider
//           full_name:
//             profile?.full_name ||
//             userData.user?.user_metadata?.full_name ||
//             userData.user?.user_metadata?.name ||
//             "",
//           avatar_url:
//             profile?.avatar_url ||
//             userData.user?.user_metadata?.avatar_url ||
//             userData.user?.user_metadata?.picture ||
//             "",
//           user_name:
//             userData.user?.user_metadata?.user_name ||
//             userData.user?.user_metadata?.preferred_username ||
//             "",
//         };

//         setUser(fullUserData);
//         setFormData({
//           full_name: fullUserData.full_name,
//           avatar_url: fullUserData.avatar_url,
//           email: fullUserData.email,
//           providers: fullUserData.providers,
//         });
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     getUser();
//   }, [router]);

//   const handleLogout = async () => {
//     try {
//       await supabase.auth.signOut();
//       router.push("/");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = async () => {
//     // Guard clause to prevent errors if user is null
//     if (!user) return;

//     try {
//       setSaving(true);

//       // Update profile in the profiles table
//       const { error } = await supabase.from("profiles").upsert({
//         id: user.id,
//         full_name: formData.full_name,
//         avatar_url: formData.avatar_url,
//         updated_at: new Date(),
//       });

//       if (error) throw error;

//       // Update the user state
//       setUser({
//         ...user,
//         full_name: formData.full_name,
//         avatar_url: formData.avatar_url,
//       });

//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const getProviderIcon = (provider) => {
//     if (!provider) return <Mail className="w-5 h-5 mr-2" />;

//     switch (provider.toLowerCase()) {
//       case "google":
//         return <Globe className="w-5 h-5 mr-2" />;
//       case "github":
//         return <Github className="w-5 h-5 mr-2" />;
//       default:
//         return <Mail className="w-5 h-5 mr-2" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <Loader className="w-8 h-8 animate-spin text-neutral-500" />
//       </div>
//     );
//   }

//   // Show error state if user is null after loading
//   if (!user) {
//     return (
//       <div className="flex flex-col items-center justify-center h-96">
//         <p className="text-lg text-red-500 mb-4">Unable to load profile data</p>
//         <button
//           onClick={() => router.push("/auth/signup")}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           Go to Sign In
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="mb-12"
//       >
//         <motion.div variants={itemVariants} className="mb-6">
//           <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300">
//             My Profile
//           </h2>
//           <p className="text-lg text-neutral-600 dark:text-neutral-400">
//             Manage your account information and preferences
//           </p>
//         </motion.div>

//         <BackgroundGradient className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
//           <div className="p-8 relative z-10">
//             <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 filter blur-xl -z-10"></div>

//             <div className="flex flex-col md:flex-row gap-8">
//               {/* Avatar section */}
//               <motion.div
//                 variants={itemVariants}
//                 className="flex flex-col items-center"
//               >
//                 <div className="relative mb-4 group">
//                   <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-lg">
//                     {user?.avatar_url ? (
//                       <img
//                         src={user.avatar_url}
//                         alt="Profile"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
//                         <User className="w-16 h-16 text-white" />
//                       </div>
//                     )}
//                   </div>
//                   {editMode && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Camera className="w-8 h-8 text-white" />
//                     </div>
//                   )}
//                 </div>

//                 {!editMode && (
//                   <button
//                     onClick={() => setEditMode(true)}
//                     className="flex items-center space-x-2 px-4 py-2 mt-4 text-sm font-medium rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
//                   >
//                     <Edit className="w-4 h-4" />
//                     <span>Edit Profile</span>
//                   </button>
//                 )}

//                 {editMode && (
//                   <div className="flex space-x-2 mt-4">
//                     <button
//                       onClick={handleSave}
//                       disabled={saving}
//                       className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition-colors"
//                     >
//                       {saving ? (
//                         <Loader className="w-4 h-4 animate-spin" />
//                       ) : (
//                         <Save className="w-4 h-4" />
//                       )}
//                       <span>Save</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         setEditMode(false);
//                         setFormData({
//                           full_name: user.full_name,
//                           avatar_url: user.avatar_url,
//                           email: user.email,
//                           providers: user.providers,
//                         });
//                       }}
//                       className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors"
//                     >
//                       <span>Cancel</span>
//                     </button>
//                   </div>
//                 )}
//               </motion.div>

//               {/* Profile information */}
//               <motion.div variants={itemVariants} className="flex-grow">
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
//                       Full Name
//                     </label>
//                     {editMode ? (
//                       <input
//                         type="text"
//                         name="full_name"
//                         value={formData.full_name}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                       />
//                     ) : (
//                       <p className="text-lg font-medium text-neutral-900 dark:text-white">
//                         {user?.full_name || "Not provided"}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
//                       Email Address
//                     </label>
//                     <div className="flex items-center">
//                       {getProviderIcon(user?.provider)}
//                       <p className="text-lg text-neutral-900 dark:text-white">
//                         {user?.email}
//                       </p>
//                     </div>

//                     <div className="mt-2">
//                       <p className="text-xs text-neutral-500 dark:text-neutral-400">
//                         Connected accounts:
//                       </p>
//                       <div className="flex mt-1 space-x-2">
//                         {user?.providers?.map((provider) => (
//                           <span
//                             key={provider}
//                             className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
//                           >
//                             {getProviderIcon(provider)}
//                             <span>{provider}</span>
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {editMode && (
//                     <div>
//                       <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
//                         Avatar URL
//                       </label>
//                       <input
//                         type="text"
//                         name="avatar_url"
//                         value={formData.avatar_url}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                       />
//                     </div>
//                   )}

//                   <div className="pt-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
//                           Account Actions
//                         </h3>
//                         <p className="text-sm text-neutral-500 dark:text-neutral-400">
//                           Manage your account settings
//                         </p>
//                       </div>
//                     </div>

//                     <div className="mt-4 flex flex-wrap gap-4">
//                       <button
//                         onClick={() => router.push("/settings/security")}
//                         className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors"
//                       >
//                         <Settings className="w-4 h-4" />
//                         <span>Security Settings</span>
//                       </button>

//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
//                       >
//                         <LogOut className="w-4 h-4" />
//                         <span>Log Out</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </BackgroundGradient>
//       </motion.div>
//     </div>
//   );
// }

import React from 'react'

export function MyProfile() {
  return (
    <div>MyProfile</div>
  )
}
