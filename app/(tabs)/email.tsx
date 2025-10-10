import React, { useMemo, useState } from "react";
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
  StatusBar,
  SafeAreaView,
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

  const [focus, setFocus] = useState<
    null | "to" | "cc" | "bcc" | "subject" | "body"
  >(null);

  const emailTemplates: EmailTemplate[] = [
    {
      id: "1",
      name: "Interview Invitation",
      subject: "Interview Invitation - [Position Name] at [Company Name]",
      body: "Dear [Candidate Name],\n\nThank you for your interest in the [Position Name] role at [Company Name]. We were impressed with your application and would like to invite you for an interview.\n\nInterview Details:\n• Date: [Date]\n• Time: [Time]\n• Location: [Address/Virtual Meeting Link]\n• Duration: Approximately [Duration]\n• Interviewers: [Names and Titles]\n\nPlease confirm your availability by replying to this email.\n\nBest regards,\n[Your Name]\n[Your Title]\n[Company Name]",
      icon: "calendar",
    },
    {
      id: "2",
      name: "Job Offer",
      subject: "Job Offer - [Position Name] at [Company Name]",
      body: "Dear [Candidate Name],\n\nCongratulations! We are pleased to offer you the position of [Position Name] at [Company Name].\n\nOffer Details:\n• Position: [Position Name]\n• Start Date: [Start Date]\n• Salary: [Salary]\n\nPlease review the attached offer letter and let us know your decision by [Deadline Date].\n\nBest regards,\n[Your Name]\n[Company Name]",
      icon: "gift",
    },
    {
      id: "3",
      name: "Application Rejection",
      subject: "Update on your application - [Position Name]",
      body: "Dear [Candidate Name],\n\nThank you for interviewing for the [Position Name] at [Company Name]. After careful consideration, we have decided to move forward with another candidate.\n\nWe appreciate your time and interest, and encourage you to apply for future roles.\n\nBest regards,\n[Your Name]\n[Company Name]",
      icon: "document",
    },
  ];

  const canSend = useMemo(
    () => to.trim() && subject.trim() && body.trim(),
    [to, subject, body]
  );

  const sendEmail = () => {
    if (!canSend) return;
    Alert.alert("Email Sent ✅", `Your email to ${to} has been sent.`, [
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
    ]);
  };

  const saveDraft = () => {
    Alert.alert("Draft Saved 💾", "Your email has been saved as a draft.");
  };

  const useTemplate = (tpl: EmailTemplate) => {
    setSubject(tpl.subject);
    setBody(tpl.body);
    setShowTemplates(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({ ios: "padding", android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 8, android: 0 })}
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <LinearGradient
              colors={["#0A0A0A", "#1A1A1A"]}
              style={styles.header}
            >
              <View style={styles.headerRow}>
                <View style={styles.headerIcon}>
                  <Ionicons name="mail" size={24} color="#FFFFFF" />
                </View>
                <View style={styles.headerText}>
                  <Text style={styles.headerTitle}>HR Email Center</Text>
                  <Text style={styles.headerSubtitle}>
                    Professional recruitment communications
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* Templates */}
            <View style={styles.section}>
              <Pressable
                style={styles.rowCard}
                onPress={() => setShowTemplates((v) => !v)}
              >
                <View style={styles.rowLeft}>
                  <View style={styles.roundIcon}>
                    <Ionicons name="document-text" size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={styles.rowTitle}>HR Email Templates</Text>
                    <Text style={styles.rowSubtitle}>
                      Ready-to-use recruitment emails
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name={showTemplates ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#9CA3AF"
                />
              </Pressable>

              {showTemplates && (
                <View style={styles.templatesList}>
                  {emailTemplates.map((t) => (
                    <Pressable
                      key={t.id}
                      style={styles.templateItem}
                      onPress={() => useTemplate(t)}
                    >
                      <View style={styles.templateLeft}>
                        <View style={styles.templateIcon}>
                          <Ionicons
                            name={t.icon as any}
                            size={18}
                            color="#FFFFFF"
                          />
                        </View>
                        <View style={styles.templateText}>
                          <Text style={styles.templateName}>{t.name}</Text>
                          <Text
                            style={styles.templatePreview}
                            numberOfLines={1}
                          >
                            {t.subject}
                          </Text>
                        </View>
                      </View>
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color="#6B7280"
                      />
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* Compose */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Compose Email</Text>

              {/* To */}
              <Field
                label="To *"
                icon="person"
                value={to}
                onFocus={() => setFocus("to")}
                onBlur={() => setFocus(null)}
                onChangeText={setTo}
                placeholder="recipient@company.com"
                isFocused={focus === "to"}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* CC/BCC toggle */}
              {!showCcBcc && (
                <Pressable
                  onPress={() => setShowCcBcc(true)}
                  style={styles.inlineLink}
                >
                  <Ionicons name="add-circle" size={16} color="#FFFFFF" />
                  <Text style={styles.inlineLinkText}>Add CC/BCC</Text>
                </Pressable>
              )}

              {/* CC */}
              {showCcBcc && (
                <Field
                  label="CC"
                  icon="copy"
                  value={cc}
                  onFocus={() => setFocus("cc")}
                  onBlur={() => setFocus(null)}
                  onChangeText={setCc}
                  placeholder="cc@company.com"
                  isFocused={focus === "cc"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}

              {/* BCC */}
              {showCcBcc && (
                <Field
                  label="BCC"
                  icon="eye-off"
                  value={bcc}
                  onFocus={() => setFocus("bcc")}
                  onBlur={() => setFocus(null)}
                  onChangeText={setBcc}
                  placeholder="bcc@company.com"
                  isFocused={focus === "bcc"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}

              {/* Subject */}
              <Field
                label="Subject *"
                icon="text"
                value={subject}
                onFocus={() => setFocus("subject")}
                onBlur={() => setFocus(null)}
                onChangeText={setSubject}
                placeholder="Enter a compelling subject line"
                isFocused={focus === "subject"}
              />

              {/* Body */}
              <Field
                label="Message *"
                icon={undefined}
                value={body}
                onFocus={() => setFocus("body")}
                onBlur={() => setFocus(null)}
                onChangeText={setBody}
                placeholder="Write your professional message here..."
                isFocused={focus === "body"}
                multiline
                numberOfLines={8}
                textArea
              />
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Pressable
                onPress={sendEmail}
                disabled={!canSend}
                style={[styles.primaryBtn, !canSend && styles.disabledBtn]}
              >
                <LinearGradient
                  colors={
                    canSend ? ["#FFFFFF", "#E0E0E0"] : ["#BDBDBD", "#A6A6A6"]
                  }
                  style={styles.primaryBtnGradient}
                >
                  <Ionicons name="send" size={20} color="#000000" />
                  <Text style={styles.primaryBtnText}>Send Email</Text>
                </LinearGradient>
              </Pressable>

              <Pressable onPress={saveDraft} style={styles.secondaryBtn}>
                <View style={styles.secondaryBtnInner}>
                  <Ionicons name="save" size={20} color="#9CA3AF" />
                  <Text style={styles.secondaryBtnText}>Save Draft</Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------- Reusable Field component ---------- */
type FieldProps = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  isFocused?: boolean;
  keyboardType?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  onFocus?: () => void;
  onBlur?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  textArea?: boolean;
};

function Field({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  isFocused,
  keyboardType,
  autoCapitalize,
  onFocus,
  onBlur,
  multiline,
  numberOfLines,
  textArea,
}: FieldProps) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View
        style={[
          styles.inputWrap,
          isFocused && styles.inputWrapFocused,
          textArea && styles.inputWrapArea,
        ]}
      >
        {!!icon && (
          <Ionicons
            name={icon}
            size={20}
            color="#9CA3AF"
            style={styles.inputIcon}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#7D8590"
          style={[styles.input, textArea && styles.inputArea]}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={textArea ? "top" : "center"}
        />
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0F0F0F" },
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: "#0F0F0F" },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 28 },

  /* Header */
  header: {
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 16,
  },
  headerRow: { flexDirection: "row", alignItems: "center" },
  headerIcon: {
    width: 42,
    height: 42,
    backgroundColor: "#374151",
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerText: { flex: 1 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  headerSubtitle: { fontSize: 13, color: "#9CA3AF" },

  /* Section container */
  section: {
    backgroundColor: "#1F2937",
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 5 },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 14,
  },

  /* Row card toggle */
  rowCard: {
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#2C3340",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  roundIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowText: { flex: 1 },
  rowTitle: { color: "#FFFFFF", fontWeight: "600", fontSize: 15 },
  rowSubtitle: { color: "#9CA3AF", fontSize: 12, marginTop: 2 },

  /* Templates list */
  templatesList: { marginTop: 12 },
  templateItem: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#2C3340",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  templateLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  templateText: { flex: 1 },
  templateName: { color: "#FFFFFF", fontWeight: "600", marginBottom: 2 },
  templatePreview: { color: "#9CA3AF", fontSize: 12 },

  /* Fields */
  fieldBlock: { marginBottom: 14 },
  fieldLabel: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 14,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#374151",
    borderRadius: 12,
    paddingHorizontal: 14,
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  inputWrapFocused: { borderColor: "#A7B2FF" },
  inputWrapArea: { alignItems: "flex-start", paddingVertical: 12 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: "#FFFFFF", fontSize: 16, paddingVertical: 8 },
  inputArea: { minHeight: 120 },

  /* Inline link */
  inlineLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    marginBottom: 8,
  },
  inlineLinkText: { color: "#FFFFFF", fontWeight: "500", marginLeft: 6 },

  /* Actions */
  actions: { paddingHorizontal: 16, paddingBottom: 28, gap: 12 },
  primaryBtn: { borderRadius: 14, overflow: "hidden" },
  disabledBtn: { opacity: 0.6 },
  primaryBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
  },
  primaryBtnText: { color: "#000", fontWeight: "700", marginLeft: 8 },
  secondaryBtn: { borderRadius: 14, overflow: "hidden" },
  secondaryBtnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#374151",
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  secondaryBtnText: { color: "#9CA3AF", fontWeight: "700", marginLeft: 8 },
});
