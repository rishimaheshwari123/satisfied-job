import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createJobs } from "../redux/action/jobAction";
import { setError, setJobCreated } from "../redux/sclice/JobSclice";
import CustomInput from "../component/Dropdowns";

const JobForm = () => {
  const dispatch = useDispatch();
  const { error, job } = useSelector((e) => e.Jobs);
  const [formData, setFormData] = useState({
    title: "",
    skills: [],
    jobType: "",
    category: "",
    graduation: "",
    openings: "",
    descriptions: [],
    preferences: [],
    salary: "",
    location: "",
  });

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      dispatch(setError(null));
    }
  }, [error]);

  const [skillInput, setSkillInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [preferenceInput, setPreferenceInput] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        skills: [...prevState.skills, skillInput],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      skills: updatedSkills,
    }));
  };

  const handleAddDescription = () => {
    if (descriptionInput.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        descriptions: [...prevState.descriptions, descriptionInput],
      }));
      setDescriptionInput("");
    }
  };

  const handleAddPreference = () => {
    if (preferenceInput.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        preferences: [...prevState.preferences, preferenceInput],
      }));
      setPreferenceInput("");
    }
  };

  const handleRemoveDescription = (index) => {
    const updatedDescriptions = [...formData.descriptions];
    updatedDescriptions.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      descriptions: updatedDescriptions,
    }));
  };

  const handleRemovePreference = (index) => {
    const updatedPreferences = [...formData.preferences];
    updatedPreferences.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      preferences: updatedPreferences,
    }));
  };

  const handleSubmit = () => {
    // Destructure formData
    const {
      title,
      jobType,
      category,
      graduation,
      openings,
      description,
      preferences,
      salary,
      location,
      skills,
    } = formData;

    // Perform validation
    if (
      !title.trim() ||
      !jobType.trim() ||
      !category.trim() ||
      !graduation.trim() ||
      !openings.trim() ||
      !salary.trim() ||
      !location.trim()
    ) {
      ToastAndroid.show(
        "Please fill in all fields and add at least one skill.",
        ToastAndroid.SHORT
      );
      return;
    }

    dispatch(createJobs(formData));

    setFormData({
      title: "",
      jobType: "",
      category: "",
      graduation: "",
      openings: "",
      salary: "",
      location: "",
      skills: [],
      description: [],
      preferences: [],
    });

    ToastAndroid.show("Job created successfully!", ToastAndroid.SHORT);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholder="Enter job title"
        />
      </View>

      <View style={styles.formGroup}>
        <View className="flex flex-row items-center justify-between ">
          <Text style={styles.label}>Skills:</Text>
          <TouchableOpacity onPress={handleAddSkill} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillInputContainer}>
          <View className="mb-2">
            <TextInput
              style={[styles.input, styles.skillInput]}
              value={skillInput}
              onChangeText={setSkillInput}
              placeholder="Enter a skill"
            />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.skillList}
        >
          {formData?.skills?.map((skill, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRemoveSkill(index)}
              style={styles.skillItem}
            >
              <Text style={styles.skillText}>{skill}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.formGroup}>
        <View className="flex flex-row items-center justify-between ">
          <Text style={styles.label}>Description:</Text>
          <TouchableOpacity
            onPress={handleAddDescription}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          value={descriptionInput}
          onChangeText={setDescriptionInput}
          placeholder="Enter job description"
          className="mb-2"
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {formData?.descriptions?.map((description, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRemoveDescription(index)}
              style={styles.skillItem}
            >
              <Text style={styles.skillText}>{description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.formGroup}>
        <View className="flex flex-row items-center justify-between ">
          <Text style={styles.label}>Preferences:</Text>
          <TouchableOpacity
            onPress={handleAddPreference}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          value={preferenceInput}
          onChangeText={setPreferenceInput}
          placeholder="Enter job preferences"
          className="mb-2"
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {formData?.preferences?.map((preference, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRemovePreference(index)}
              style={styles.skillItem}
            >
              <Text style={styles.skillText}>{preference}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <CustomInput
        label="Job Type"
        options={["In Office", "Remote"]}
        onSelect={(option) => setFormData({ ...formData, jobType: option })}
      />

      <CustomInput
        label="Category"
        options={["Internship", "job"]}
        onSelect={(option) => setFormData({ ...formData, category: option })}
      />

      <View style={styles.formGroup}>
        <Text style={styles.label}>Education:</Text>
        <TextInput
          style={styles.input}
          value={formData.graduation}
          onChangeText={(text) =>
            setFormData({ ...formData, graduation: text })
          }
          placeholder="Enter Education requirements"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Openings:</Text>
        <TextInput
          style={styles.input}
          value={formData.openings}
          onChangeText={(text) => setFormData({ ...formData, openings: text })}
          placeholder="Enter number of openings"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Salary:</Text>
        <TextInput
          style={styles.input}
          value={formData.salary}
          onChangeText={(text) => setFormData({ ...formData, salary: text })}
          placeholder="Enter salary"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
          placeholder="Enter job location"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
    fontStyle: "capital",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
  },

  addButton: {
    backgroundColor: "#4080ED",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 10,
  },

  addButtonText: {
    color: "white",
    fontSize: 15,
  },

  skillItem: {
    backgroundColor: "#4080ED",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  skillText: {
    color: "white",
  },
  submitButtonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#4080ED",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default JobForm;
