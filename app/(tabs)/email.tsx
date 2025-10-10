import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  icon: string;
}

export default function EmailPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const emailTemplates: EmailTemplate[] = [
    {
      id: "1",
      name: "Interview Invitation",
      subject: "Interview Invitation - [Position Name] at [Company Name]",
      body: "Dear [Candidate Name],\n\nThank you for your interest in the [Position Name] role at [Company Name]. We were impressed with your application and would like to invite you for an interview.\n\nInterview Details:\n• Date: [Date]\n• Time: [Time]\n• Location: [Address/Virtual Meeting Link]\n• Duration: Approximately [Duration]\n• Interviewers: [Names and Titles]\n\nPlease confirm your availability by replying to this email. If you have any questions or need to reschedule, please don't hesitate to reach out.\n\nWe look forward to meeting you!\n\nBest regards,\n[Your Name]\n[Your Title]\n[Company Name]",
      icon: "calendar",
    },
    {
      id: "2",
      name: "Job Offer",
      subject: "Job Offer - [Position Name] at [Company Name]",
      body: "Dear [Candidate Name],\n\nCongratulations! We are pleased to offer you the position of [Position Name] at [Company Name].\n\nOffer Details:\n• Position: [Position Name]\n• Department: [Department]\n• Start Date: [Start Date]\n• Salary: [Salary Amount]\n• Benefits: [Benefits Summary]\n• Reporting Manager: [Manager Name]\n\nThis offer is contingent upon [any conditions, e.g., background check, references].\n\nPlease review the attached offer letter and let us know your decision by [Deadline Date]. We're excited about the possibility of you joining our team!\n\nBest regards,\n[Your Name]\n[Your Title]\n[Company Name]",
      icon: "gift",
    },
    {
      id: "3",
      name: "Application Rejection",
      subject: "Update on your application - [Position Name]",
      body: "Dear [Candidate Name],\n\nThank you for your interest in the [Position Name] role at [Company Name] and for taking the time to interview with our team.\n\nAfter careful consideration, we have decided to move forward with another candidate whose experience more closely aligns with our current needs.\n\nWe were impressed with your [specific positive feedback] and encourage you to apply for future opportunities that match your skills and interests. We will keep your resume on file for six months.\n\nThank you again for your time and interest in [Company Name]. We wish you the best in your job search.\n\nBest regards,\n[Your Name]\n[Your Title]\n[Company Name]",
      icon: "document",
    },
    {
      id: "4",
      name: "Onboarding Welcome",
      subject: "Welcome to [Company Name] - First Day Information",
      body: "Dear [Employee Name],\n\nWelcome to [Company Name]! We're thrilled to have you join our team as [Position Name].\n\nFirst Day Details:\n• Date: [Start Date]\n• Time: [Start Time]\n• Location: [Office Address/Remote Instructions]\n• Contact: [HR Contact] at [Phone/Email]\n\nWhat to Expect:\n• Orientation session with HR\n• Meet your team and manager\n• IT setup and account creation\n• Review of company policies and procedures\n\nWhat to Bring:\n• Valid ID for I-9 verification\n• Completed onboarding documents\n• Bank details for direct deposit setup\n\nIf you have any questions before your first day, please don't hesitate to reach out.\n\nWe look forward to working with you!\n\nBest regards,\n[Your Name]\n[Your Title]\n[Company Name]",
      icon: "checkmark-circle",
    },
    {
      id: "5",
      name: "Reference Check",
      subject: "Reference Check for [Candidate Name] - [Position Name]",
      body: "Dear [Reference Name],\n\n[Candidate Name] has applied for the position of [Position Name] at [Company Name] and has listed you as a professional reference.\n\nWe would greatly appreciate your insights regarding [Candidate Name]'s:\n• Work performance and quality\n• Reliability and work ethic\n• Communication and teamwork skills\n• Areas of strength and development\n• Overall recommendation for this role\n\nWould you be available for a brief 10-15 minute phone call this week? Alternatively, you can respond to this email with your feedback.\n\nAll information will be kept confidential and used solely for employment evaluation purposes.\n\nThank you for your time and assistance.\n\nBest regards,\n[Your Name]\n[Your Title]\n[Company Name]\n[Phone Number]",
      icon: "people",
    },
    {
      id: "6",
      name: "Candidate Follow-up",
      subject: "Update on your application status - [Position Name]",
      body: "Dear [Candidate Name],\n\nI hope this email finds you well. I wanted to provide you with an update on your application for the [Position Name] role at [Company Name].\n\nWe are currently in the [stage of process, e.g., 'final review stage'] and expect to make our decision by [expected date]. We appreciate your patience during this process.\n\nYour interview performance was [positive feedback] and we are carefully considering all qualified candidates.\n\nWe will contact you with our final decision no later than [date]. In the meantime, please feel free to reach out if you have any questions.\n\nThank you for your continued interest in [Company Name].\n\nBest regards,\n[Your Name]\n[Your Title]\n[Company Name]",
      icon: "time",
    },
  ];

  const sendEmail = () => {
    if (!to.trim()) {
      Alert.alert("Error", "Please enter a recipient email address.");
      return;
    }
    if (!subject.trim()) {
      Alert.alert("Error", "Please enter a subject.");
      return;
    }
    if (!body.trim()) {
      Alert.alert("Error", "Please enter a message.");
      return;
    }

    Alert.alert(
      "Email Sent! ✅",
      `Your professional email to ${to} has been sent successfully.`,
      [
        {
          text: "OK",
          onPress: () => {
            setTo("");
            setSubject("");
            setBody("");
            setCc("");
            setBcc("");
            setShowCcBcc(false);
          },
        },
      ]
    );
  };

  const saveDraft = () => {
    Alert.alert("Draft Saved 💾", "Your email has been saved as a draft.");
  };

  const useTemplate = (template: EmailTemplate) => {
    setSubject(template.subject);
    setBody(template.body);
    setShowTemplates(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient colors={["#0A0A0A", "#1A1A1A"]} style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerIcon}>
              <Ionicons name="mail" size={28} color="#FFFFFF" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>HR Email Center</Text>
              <Text style={styles.headerSubtitle}>
                Professional recruitment communications
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Templates Section */}
        <View style={styles.section}>
          <Pressable
            style={styles.templatesToggle}
            onPress={() => setShowTemplates(!showTemplates)}
          >
            <View style={styles.templatesToggleContent}>
              <View style={styles.templatesIcon}>
                <Ionicons name="document-text" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.templatesTextContainer}>
                <Text style={styles.templatesTitle}>HR Email Templates</Text>
                <Text style={styles.templatesSubtitle}>
                  Ready-to-use recruitment emails
                </Text>
              </View>
              <Ionicons
                name={showTemplates ? "chevron-up" : "chevron-down"}
                size={20}
                color="#9CA3AF"
              />
            </View>
          </Pressable>

          {showTemplates && (
            <View style={styles.templatesContainer}>
              {emailTemplates.map((template) => (
                <Pressable
                  key={template.id}
                  style={styles.templateItem}
                  onPress={() => useTemplate(template)}
                >
                  <View
                    style={[
                      styles.templateIcon,
                      { backgroundColor: "#FFFFFF" + "20" },
                    ]}
                  >
                    <Ionicons
                      name={template.icon as any}
                      size={20}
                      color="#FFFFFF"
                    />
                  </View>
                  <View style={styles.templateText}>
                    <Text style={styles.templateName}>{template.name}</Text>
                    <Text style={styles.templatePreview} numberOfLines={1}>
                      {template.subject}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Email Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compose Email</Text>

          {/* To Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>To *</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person"
                size={20}
                color="#6B7280"
                style={styles.inputIcon}
              />
              <TextInput
                value={to}
                onChangeText={setTo}
                placeholder="recipient@company.com"
                placeholderTextColor="#6B7280"
                style={styles.textInput}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* CC/BCC Toggle */}
          {!showCcBcc && (
            <Pressable
              onPress={() => setShowCcBcc(true)}
              style={styles.ccBccToggle}
            >
              <Ionicons name="add-circle" size={16} color="#FFFFFF" />
              <Text style={styles.ccBccToggleText}>Add CC/BCC</Text>
            </Pressable>
          )}

          {/* CC Field */}
          {showCcBcc && (
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>CC</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="copy"
                  size={20}
                  color="#6B7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  value={cc}
                  onChangeText={setCc}
                  placeholder="cc@company.com"
                  placeholderTextColor="#6B7280"
                  style={styles.textInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          )}

          {/* BCC Field */}
          {showCcBcc && (
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>BCC</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="eye-off"
                  size={20}
                  color="#6B7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  value={bcc}
                  onChangeText={setBcc}
                  placeholder="bcc@company.com"
                  placeholderTextColor="#6B7280"
                  style={styles.textInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          )}

          {/* Subject Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Subject *</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="text"
                size={20}
                color="#6B7280"
                style={styles.inputIcon}
              />
              <TextInput
                value={subject}
                onChangeText={setSubject}
                placeholder="Enter a compelling subject line"
                placeholderTextColor="#6B7280"
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Message Body */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Message *</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                value={body}
                onChangeText={setBody}
                placeholder="Write your professional message here..."
                placeholderTextColor="#6B7280"
                style={[styles.textInput, styles.textArea]}
                multiline
                numberOfLines={8}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable onPress={sendEmail} style={styles.sendButton}>
            <LinearGradient
              colors={["#FFFFFF", "#E0E0E0"]}
              style={styles.sendButtonGradient}
            >
              <Ionicons name="send" size={20} color="#000000" />
              <Text style={styles.sendButtonText}>Send Email</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={saveDraft} style={styles.draftButton}>
            <View style={styles.draftButtonContent}>
              <Ionicons name="save" size={20} color="#9CA3AF" />
              <Text style={styles.draftButtonText}>Save Draft</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#374151",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  section: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  templatesToggle: {
    marginBottom: 16,
  },
  templatesToggleContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#374151",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  templatesIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#FFFFFF" + "20",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  templatesTextContainer: {
    flex: 1,
  },
  templatesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  templatesSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  templatesContainer: {
    marginTop: 12,
  },
  templateItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#374151",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  templateText: {
    flex: 1,
  },
  templateName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  templatePreview: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#374151",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  textAreaContainer: {
    alignItems: "flex-start",
    paddingVertical: 16,
    minHeight: 120,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  textArea: {
    textAlignVertical: "top",
    minHeight: 88,
  },
  ccBccToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  ccBccToggleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 12,
  },
  sendButton: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sendButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 8,
  },
  draftButton: {
    borderRadius: 16,
  },
  draftButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "#374151",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9CA3AF",
    marginLeft: 8,
  },
});
