import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  StyleSheet,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

interface JobDescription {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string;
  benefits: string;
  datePosted: string;
}

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightComponent,
}) => (
  <Pressable onPress={onPress} style={styles.settingItem}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon as any} size={20} color="#8B5CF6" />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {rightComponent ||
      (showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      ))}
  </Pressable>
);

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showJobList, setShowJobList] = useState(false);
  const [editingJob, setEditingJob] = useState<JobDescription | null>(null);

  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
  });

  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([
    {
      id: "1",
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      salary: "$120,000 - $150,000",
      description:
        "We are looking for a Senior Software Engineer to join our growing team...",
      requirements:
        "Bachelor's degree in Computer Science, 5+ years of experience...",
      benefits: "Health insurance, 401k, flexible work hours...",
      datePosted: "2024-01-15",
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      experience: "3+ years",
      salary: "$100,000 - $130,000",
      description: "Join our product team to drive innovation and strategy...",
      requirements: "MBA preferred, 3+ years in product management...",
      benefits: "Health insurance, stock options, professional development...",
      datePosted: "2024-01-10",
    },
  ]);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  const resetJobForm = () => {
    setJobForm({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      experience: "",
      salary: "",
      description: "",
      requirements: "",
      benefits: "",
    });
    setEditingJob(null);
  };

  const handleSaveJob = () => {
    if (!jobForm.title.trim() || !jobForm.department.trim()) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newJob: JobDescription = {
      id: editingJob ? editingJob.id : Date.now().toString(),
      ...jobForm,
      datePosted: editingJob
        ? editingJob.datePosted
        : new Date().toISOString().split("T")[0],
    };

    if (editingJob) {
      setJobDescriptions((prev) =>
        prev.map((job) => (job.id === editingJob.id ? newJob : job))
      );
    } else {
      setJobDescriptions((prev) => [...prev, newJob]);
    }

    resetJobForm();
    setShowJobModal(false);
    Alert.alert(
      "Success",
      editingJob ? "Job updated successfully!" : "Job created successfully!"
    );
  };

  const handleEditJob = (job: JobDescription) => {
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits,
    });
    setEditingJob(job);
    setShowJobModal(true);
  };

  const handleDeleteJob = (jobId: string) => {
    Alert.alert(
      "Delete Job",
      "Are you sure you want to delete this job description?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setJobDescriptions((prev) =>
              prev.filter((job) => job.id !== jobId)
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Profile Section */}
          <View style={styles.profileCard}>
            <View style={styles.profileContent}>
              <LinearGradient
                colors={["#8B5CF6", "#A855F7"]}
                style={styles.avatarGradient}
              >
                <Text style={styles.avatarText}>HR</Text>
              </LinearGradient>
              <Text style={styles.profileName}>HR Manager</Text>
              <Text style={styles.profileEmail}>hr@company.com</Text>
              <Pressable
                onPress={() =>
                  showAlert(
                    "Edit Profile",
                    "Profile editing feature coming soon!"
                  )
                }
                style={styles.editButton}
              >
                <LinearGradient
                  colors={["#8B5CF6", "#A855F7"]}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>

          {/* Job Management Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Job Management</Text>
            </View>

            <SettingItem
              icon="briefcase"
              title="Manage Job Descriptions"
              subtitle={`${jobDescriptions.length} active job postings`}
              onPress={() => setShowJobList(true)}
            />

            <Pressable
              onPress={() => {
                resetJobForm();
                setShowJobModal(true);
              }}
              style={styles.addJobButton}
            >
              <LinearGradient
                colors={["#10B981", "#059669"]}
                style={styles.buttonGradient}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.addJobText}>Add New Job Description</Text>
              </LinearGradient>
            </Pressable>
          </View>

          {/* Settings Sections */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Preferences</Text>
            </View>

            <SettingItem
              icon="notifications"
              title="Notifications"
              subtitle="Push notifications for applications"
              showArrow={false}
              rightComponent={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#374151", true: "#8B5CF6" }}
                  thumbColor={notificationsEnabled ? "#FFFFFF" : "#6B7280"}
                />
              }
            />

            <SettingItem
              icon="moon"
              title="Dark Mode"
              subtitle="Switch to dark theme"
              showArrow={false}
              rightComponent={
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: "#374151", true: "#8B5CF6" }}
                  thumbColor={darkMode ? "#FFFFFF" : "#6B7280"}
                />
              }
            />

            <SettingItem
              icon="sync"
              title="Auto Sync"
              subtitle="Automatically sync data across devices"
              showArrow={false}
              rightComponent={
                <Switch
                  value={autoSync}
                  onValueChange={setAutoSync}
                  trackColor={{ false: "#374151", true: "#8B5CF6" }}
                  thumbColor={autoSync ? "#FFFFFF" : "#6B7280"}
                />
              }
            />
          </View>

          {/* Account Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Account</Text>
            </View>

            <SettingItem
              icon="key"
              title="Change Password"
              subtitle="Update your account password"
              onPress={() =>
                showAlert(
                  "Change Password",
                  "Password change feature coming soon!"
                )
              }
            />

            <SettingItem
              icon="shield-checkmark"
              title="Privacy & Security"
              subtitle="Manage your privacy settings"
              onPress={() =>
                showAlert("Privacy & Security", "Privacy settings coming soon!")
              }
            />

            <SettingItem
              icon="card"
              title="Billing & Subscription"
              subtitle="Manage your subscription"
              onPress={() =>
                showAlert("Billing", "Billing management coming soon!")
              }
            />
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Support</Text>
            </View>

            <SettingItem
              icon="help-circle"
              title="Help Center"
              subtitle="Get help and support"
              onPress={() =>
                showAlert("Help Center", "Help center feature coming soon!")
              }
            />

            <SettingItem
              icon="chatbubble-ellipses"
              title="Contact Support"
              subtitle="Send us a message"
              onPress={() =>
                showAlert("Contact Support", "Contact feature coming soon!")
              }
            />

            <SettingItem
              icon="information-circle"
              title="About"
              subtitle="App version and information"
              onPress={() =>
                showAlert(
                  "About",
                  "HR Mobile App v1.0.0\nBuilt with React Native & Expo"
                )
              }
            />
          </View>

          {/* Logout Button */}
          <Pressable
            onPress={() =>
              showAlert("Logout", "Are you sure you want to logout?")
            }
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Job List Modal */}
      <Modal
        visible={showJobList}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowJobList(false)}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.modalTitle}>Job Descriptions</Text>
            <Pressable
              onPress={() => {
                setShowJobList(false);
                resetJobForm();
                setShowJobModal(true);
              }}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </Pressable>
          </View>

          <ScrollView style={styles.jobList}>
            {jobDescriptions.map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <View style={styles.jobActions}>
                    <Pressable
                      onPress={() => handleEditJob(job)}
                      style={styles.actionButton}
                    >
                      <Ionicons name="pencil" size={16} color="#8B5CF6" />
                    </Pressable>
                    <Pressable
                      onPress={() => handleDeleteJob(job.id)}
                      style={styles.actionButton}
                    >
                      <Ionicons name="trash" size={16} color="#EF4444" />
                    </Pressable>
                  </View>
                </View>
                <Text style={styles.jobDepartment}>
                  {job.department} • {job.location}
                </Text>
                <Text style={styles.jobType}>
                  {job.type} • {job.experience}
                </Text>
                <Text style={styles.jobSalary}>{job.salary}</Text>
                <Text style={styles.jobDate}>Posted: {job.datePosted}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* Add/Edit Job Modal */}
      <Modal
        visible={showJobModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowJobModal(false)}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.modalTitle}>
              {editingJob ? "Edit Job" : "Add New Job"}
            </Text>
            <Pressable onPress={handleSaveJob}>
              <Ionicons name="checkmark" size={24} color="#FFFFFF" />
            </Pressable>
          </View>

          <ScrollView style={styles.formContainer}>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Job Title *</Text>
              <TextInput
                style={styles.textInput}
                value={jobForm.title}
                onChangeText={(text) => setJobForm({ ...jobForm, title: text })}
                placeholder="e.g. Senior Software Engineer"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Department *</Text>
              <TextInput
                style={styles.textInput}
                value={jobForm.department}
                onChangeText={(text) =>
                  setJobForm({ ...jobForm, department: text })
                }
                placeholder="e.g. Engineering"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                value={jobForm.location}
                onChangeText={(text) =>
                  setJobForm({ ...jobForm, location: text })
                }
                placeholder="e.g. Remote / New York, NY"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Employment Type</Text>
              <TextInput
                style={styles.textInput}
                value={jobForm.type}
                onChangeText={(text) => setJobForm({ ...jobForm, type: text })}
                placeholder="e.g. Full-time / Part-time / Contract"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Experience Required</Text>
              <TextInput
                style={styles.textInput}
                value={jobForm.experience}
                onChangeText={(text) =>
                  setJobForm({ ...jobForm, experience: text })
                }
                placeholder="e.g. 3-5 years"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Salary Range</Text>
              <TextInput
                style={styles.textInput}
                value={jobForm.salary}
                onChangeText={(text) =>
                  setJobForm({ ...jobForm, salary: text })
                }
                placeholder="e.g. $80,000 - $120,000"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Job Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={jobForm.description}
                onChangeText={(text) =>
                  setJobForm({ ...jobForm, description: text })
                }
                placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                placeholderTextColor="#6B7280"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Requirements</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={jobForm.requirements}
                onChangeText={(text) =>
                  setJobForm({ ...jobForm, requirements: text })
                }
                placeholder="List the required skills, qualifications, and experience..."
                placeholderTextColor="#6B7280"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Benefits</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={jobForm.benefits}
                onChangeText={(text) =>
                  setJobForm({ ...jobForm, benefits: text })
                }
                placeholder="List the benefits, perks, and compensation details..."
                placeholderTextColor="#6B7280"
                multiline
                numberOfLines={3}
              />
            </View>

            <Pressable onPress={handleSaveJob} style={styles.saveButton}>
              <LinearGradient
                colors={["#8B5CF6", "#A855F7"]}
                style={styles.buttonGradient}
              >
                <Text style={styles.saveButtonText}>
                  {editingJob
                    ? "Update Job Description"
                    : "Save Job Description"}
                </Text>
              </LinearGradient>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
  },
  profileContent: {
    alignItems: "center",
  },
  avatarGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 16,
  },
  editButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
  },
  sectionHeader: {
    backgroundColor: "#374151",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#374151",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  settingSubtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 2,
  },
  addJobButton: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  addJobText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: "#DC2626",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1F2937",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  jobList: {
    flex: 1,
    padding: 20,
  },
  jobCard: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  jobTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  jobActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    backgroundColor: "#374151",
    borderRadius: 8,
  },
  jobDepartment: {
    color: "#8B5CF6",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  jobType: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 4,
  },
  jobSalary: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  jobDate: {
    color: "#6B7280",
    fontSize: 12,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formField: {
    marginBottom: 20,
  },
  fieldLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
