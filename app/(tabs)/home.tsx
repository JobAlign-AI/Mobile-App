import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function Home() {
  const [selectedJob, setSelectedJob] = useState("Software Engineer");
  const [modalVisible, setModalVisible] = useState(false);
  const [cvName, setCvName] = useState<string | null>(null);
  const [similarity, setSimilarity] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const jobOptions = [
    {
      title: "Software Engineer",
      icon: "code-slash" as const,
      color: "#FFFFFF",
      description: "Full-stack development with modern frameworks",
    },
    {
      title: "Data Scientist",
      icon: "analytics" as const,
      color: "#FFFFFF",
      description: "Machine learning and data analysis",
    },
    {
      title: "UI/UX Designer",
      icon: "color-palette" as const,
      color: "#FFFFFF",
      description: "User interface and experience design",
    },
    {
      title: "DevOps Engineer",
      icon: "server" as const,
      color: "#FFFFFF",
      description: "Infrastructure and deployment automation",
    },
    {
      title: "Product Manager",
      icon: "briefcase" as const,
      color: "#FFFFFF",
      description: "Product strategy and development",
    },
    {
      title: "AI Research Scientist",
      icon: "bulb" as const,
      color: "#FFFFFF",
      description: "Artificial intelligence and research",
    },
  ];

  const selectedJobData =
    jobOptions.find((job) => job.title === selectedJob) || jobOptions[0];

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    });

    if (result.assets && result.assets.length > 0) {
      setCvName(result.assets[0].name);
      setIsAnalyzing(true);

      // Simulate analysis
      setTimeout(() => {
        setSimilarity((85 + Math.random() * 15).toFixed(1));
        setIsAnalyzing(false);
      }, 2500);
    }
  };

  const getSimilarityColor = (score: string) => {
    return "#FFFFFF";
  };

  const getSimilarityText = (score: string) => {
    const num = parseFloat(score);
    if (num >= 90) return "Excellent Match";
    if (num >= 75) return "Good Match";
    if (num >= 60) return "Fair Match";
    return "Poor Match";
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={["#0A0A0A", "#1A1A1A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="document-text" size={32} color="#FFFFFF" />
                </View>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.headerTitle}>JobAlign AI</Text>
                  <Text style={styles.headerSubtitle}>Smart CV Analysis</Text>
                </View>
              </View>
              <Text style={styles.headerDescription}>
                Upload your CV and get AI-powered job match analysis with
                personalized recommendations.
              </Text>
            </View>
          </LinearGradient>

          {/* Stats Card */}
          <View style={styles.statsCardContainer}>
            <View style={styles.statsCard}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>98%</Text>
                  <Text style={styles.statLabel}>Accuracy</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>50K+</Text>
                  <Text style={styles.statLabel}>CVs Analyzed</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>1.2K</Text>
                  <Text style={styles.statLabel}>Job Roles</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* CV Upload Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="cloud-upload" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>Upload Your CV</Text>
                <Text style={styles.sectionSubtitle}>
                  PDF, DOC, or DOCX format
                </Text>
              </View>
            </View>

            <Pressable onPress={pickDocument} style={styles.uploadButton}>
              <LinearGradient
                colors={
                  cvName ? ["#FFFFFF", "#E0E0E0"] : ["#FFFFFF", "#D0D0D0"]
                }
                style={styles.uploadButtonGradient}
              >
                <View style={styles.uploadButtonContent}>
                  <Ionicons
                    name={cvName ? "checkmark-circle" : "cloud-upload"}
                    size={24}
                    color="#000000"
                  />
                  <Text style={styles.uploadButtonText}>
                    {cvName
                      ? "CV Uploaded Successfully"
                      : "Choose File to Upload"}
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>

            {cvName && (
              <View style={styles.uploadSuccess}>
                <View style={styles.uploadSuccessContent}>
                  <Ionicons name="document-text" size={20} color="#FFFFFF" />
                  <Text style={styles.uploadSuccessText} numberOfLines={1}>
                    {cvName}
                  </Text>
                  <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                </View>
              </View>
            )}
          </View>

          {/* Job Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View
                style={[
                  styles.sectionIconContainer,
                  { backgroundColor: selectedJobData.color + "20" },
                ]}
              >
                <Ionicons
                  name={selectedJobData.icon}
                  size={24}
                  color={selectedJobData.color}
                />
              </View>
              <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>Target Role</Text>
                <Text style={styles.sectionSubtitle}>
                  Select your desired position
                </Text>
              </View>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.changeButton}
              >
                <Text style={styles.changeButtonText}>Change</Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.jobCard,
                { borderColor: selectedJobData.color + "30" },
              ]}
            >
              <Text style={styles.jobCardTitle}>{selectedJobData.title}</Text>
              <Text style={styles.jobCardDescription}>
                {selectedJobData.description}
              </Text>
            </View>
          </View>

          {/* Analyze Button */}
          {cvName && !similarity && !isAnalyzing && (
            <Pressable
              onPress={() => {
                setIsAnalyzing(true);
                setTimeout(() => {
                  setSimilarity((85 + Math.random() * 15).toFixed(1));
                  setIsAnalyzing(false);
                }, 2500);
              }}
              style={styles.analyzeButtonContainer}
            >
              <LinearGradient
                colors={["#FFFFFF", "#E0E0E0"]}
                style={styles.analyzeButton}
              >
                <View style={styles.analyzeButtonContent}>
                  <Ionicons name="analytics" size={24} color="#000000" />
                  <Text style={styles.analyzeButtonText}>Analyze CV Match</Text>
                </View>
              </LinearGradient>
            </Pressable>
          )}

          {/* Loading */}
          {isAnalyzing && (
            <View style={styles.section}>
              <View style={styles.loadingContainer}>
                <View style={styles.loadingIcon}>
                  <Ionicons name="analytics" size={40} color="#FFFFFF" />
                </View>
                <Text style={styles.loadingTitle}>Analyzing Your CV</Text>
                <Text style={styles.loadingDescription}>
                  Comparing your CV with the {selectedJobData.title} role...
                </Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar} />
                </View>
                <Text style={styles.loadingNote}>
                  This may take a few moments
                </Text>
              </View>
            </View>
          )}

          {/* Similarity Result */}
          {similarity && !isAnalyzing && (
            <View style={styles.section}>
              <View style={styles.scoreContainer}>
                <View
                  style={[
                    styles.scoreCircle,
                    { backgroundColor: getSimilarityColor(similarity) + "20" },
                  ]}
                >
                  <Text
                    style={[
                      styles.scoreNumber,
                      { color: getSimilarityColor(similarity) },
                    ]}
                  >
                    {similarity}%
                  </Text>
                </View>
                <Text style={styles.scoreTitle}>
                  {getSimilarityText(similarity)}
                </Text>
                <Text style={styles.scoreDescription}>
                  Compatibility with {selectedJobData.title} role
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Job Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderText}>
                <Text style={styles.modalTitle}>Select Job Role</Text>
                <Text style={styles.modalSubtitle}>
                  Choose your desired target position
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={22} color="#D1D5DB" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView}>
              {jobOptions.map((job) => {
                const selected = job.title === selectedJob;
                return (
                  <TouchableOpacity
                    key={job.title}
                    onPress={() => {
                      setSelectedJob(job.title);
                      setModalVisible(false);
                    }}
                    style={[
                      styles.jobOption,
                      selected
                        ? styles.selectedJobOption
                        : styles.unselectedJobOption,
                    ]}
                  >
                    <View style={styles.jobOptionContent}>
                      <View
                        style={[
                          styles.jobOptionIcon,
                          { backgroundColor: job.color + "20" },
                        ]}
                      >
                        <Ionicons name={job.icon} size={28} color={job.color} />
                      </View>
                      <View style={styles.jobOptionText}>
                        <Text
                          style={[
                            styles.jobOptionTitle,
                            selected
                              ? styles.selectedJobTitle
                              : styles.unselectedJobTitle,
                          ]}
                        >
                          {job.title}
                        </Text>
                        <Text style={styles.jobOptionDescription}>
                          {job.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.modalFooter}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 24,
  },
  headerContainer: {
    position: "relative",
  },
  headerGradient: {
    height: 280,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#D1D5DB",
  },
  headerDescription: {
    fontSize: 16,
    color: "#D1D5DB",
    lineHeight: 24,
    opacity: 0.9,
    marginBottom: 35,
  },
  statsCardContainer: {
    position: "absolute",
    bottom: -80,
    left: 24,
    right: 24,
    marginBottom: 16,
  },
  statsCard: {
    backgroundColor: "#1F2937",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: "#374151",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    marginTop: 30,
    marginBottom: 50,
  },
  section: {
    backgroundColor: "#1F2937",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  changeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  changeButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  uploadButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  uploadButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  uploadButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  uploadSuccess: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  uploadSuccessContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadSuccessText: {
    color: "#FFFFFF",
    fontWeight: "500",
    marginLeft: 8,
    flex: 1,
  },
  jobCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#111827",
    borderWidth: 1,
  },
  jobCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  jobCardDescription: {
    fontSize: 14,
    color: "#9CA3AF",
    lineHeight: 20,
  },
  analyzeButtonContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  analyzeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  analyzeButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  analyzeButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  loadingDescription: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  progressContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#374151",
    borderRadius: 4,
    marginBottom: 12,
  },
  progressBar: {
    width: "75%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  loadingNote: {
    fontSize: 14,
    color: "#6B7280",
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: "bold",
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  scoreDescription: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
  },
  breakdownContainer: {
    marginBottom: 24,
  },
  breakdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#111827",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#374151",
  },
  breakdownLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  breakdownLabel: {
    color: "#FFFFFF",
    fontWeight: "500",
    marginLeft: 8,
  },
  breakdownValue: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  recommendationContainer: {
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: "#D1D5DB",
    lineHeight: 20,
  },
  actionCardsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  actionCardContent: {
    alignItems: "center",
  },
  actionCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionCardTitle: {
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  actionCardSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#1F2937",
    borderRadius: 24,
    height: "80%",
    width: "90%",
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 16,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  modalHeaderText: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  modalScrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  jobOption: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
  },
  selectedJobOption: {
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  unselectedJobOption: {
    borderColor: "#374151",
    backgroundColor: "#111827",
  },
  jobOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  jobOptionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  jobOptionText: {
    flex: 1,
  },
  jobOptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  selectedJobTitle: {
    color: "#FFFFFF",
  },
  unselectedJobTitle: {
    color: "#FFFFFF",
  },
  jobOptionDescription: {
    fontSize: 14,
    color: "#9CA3AF",
    lineHeight: 22,
  },
  modalFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  cancelButton: {
    backgroundColor: "#374151",
    borderRadius: 16,
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: "#D1D5DB",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});
