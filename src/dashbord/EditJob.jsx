import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getJobById, updateJob } from "../redux/action/jobAction";
import { setError } from "../redux/sclice/JobSclice";
import CustomInput from "../component/Dropdowns";
import { useRoute } from "@react-navigation/native";
import Loading from "../component/Loading";

const EditJob = () => {
  const route = useRoute();
  const { id } = route.params;

  const dispatch = useDispatch();
  const { error, loading, job } = useSelector((state) => state.Jobs);

  const [formData, setFormData] = useState({
    title: "",
    skills: [],
    jobType: "",
    category: "",
    graduation: "",
    openings: "",
    description: [],
    preferences: [],
    salary: "",
    location: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getJobById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  const handleUpdate = () => {
    dispatch(getJobById(id, formData));
    ToastAndroid.show("Job updated successfully!", ToastAndroid.SHORT);
  };

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
        description: [...prevState.description, descriptionInput],
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
    const updatedDescriptions = [...formData.description];
    updatedDescriptions.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      description: updatedDescriptions,
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              placeholder="Enter job title"
            />
          </View>

          <CustomInput
            label="Job Type"
            options={["In Office", "Remote"]}
            onSelect={(option) => setFormData({ ...formData, jobType: option })}
            selectedValue={formData.jobType}
          />

          <CustomInput
            label="Category"
            options={["Internship", "Job"]}
            onSelect={(option) =>
              setFormData({ ...formData, category: option })
            }
            selectedValue={formData.category}
          />

          <View style={styles.formGroup}>
            <Text style={styles.label}>Openings:</Text>
            <TextInput
              style={styles.input}
              value={String(formData.openings)}
              onChangeText={(text) =>
                setFormData({ ...formData, openings: text })
              }
              placeholder="Enter number of openings"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Salary:</Text>
            <TextInput
              style={styles.input}
              value={String(formData.salary)}
              onChangeText={(text) =>
                setFormData({ ...formData, salary: text })
              }
              placeholder="Enter salary"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Location:</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              className="capitalize"
              onChangeText={(text) =>
                setFormData({ ...formData, location: text })
              }
              placeholder="Enter job location"
            />
          </View>

          <View style={styles.formGroup}>
            <View className="flex flex-row items-center justify-between ">
              <Text style={styles.label}>Skills:</Text>
              <TouchableOpacity
                onPress={handleAddSkill}
                style={styles.addButton}
              >
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
              {formData?.description?.map((description, index) => (
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

          <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
            <Text style={styles.submitButtonText}>Update</Text>
          </TouchableOpacity>
        </>
      )}
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
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
  submitButton: {
    backgroundColor: "#4080ED",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default EditJob;
