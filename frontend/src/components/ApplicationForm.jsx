import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Send, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { cn } from "@/lib/utils";



const ApplicationForm = () => {
  const { schoolType } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    nationalId: "",
    dob: "",
    age: "",
    religion: "",
    ethnicity: "",
    nationality: "",
    phone: "",
    address: "",
    previousSchool: "",
    gpa: "",
    gradeApplyingFor: "",
    profilePicture: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep = () => {
    const requiredFields =
      step === 1
        ? [
            "title",
            "name",
            "nationalId",
            "dob",
            "age",
            "religion",
            "ethnicity",
            "nationality",
            "phone",
            
          ]
        : ["address", "previousSchool", "gpa", "gradeApplyingFor"];

    return requiredFields.every(
      (field) =>
        formData[field] !== undefined &&
        formData[field] !== null &&
        formData[field].toString().trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/application",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { id } = response.data;
      setApplicationId(id);
      setShowAlert(true);
    } catch (error) {
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    navigate("/");
  };

  const handleNextStep = () => {
    if (validateStep()) setStep((nextStep) => nextStep + 1);
    else alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
  };

  const handlePrevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Alert className="max-w-md w-full bg-white shadow-lg rounded-lg">
            <AlertTitle className="text-lg font-semibold mb-2">
              Application Submitted Successfully
            </AlertTitle>
            <AlertDescription className="mb-4">
              Your application ID is:{" "}
              {applicationId
                ? applicationId.toString().padStart(6, "0")
                : "N/A"}
            </AlertDescription>
            <Button onClick={closeAlert} className="w-full">
              Close <X className="ml-2 h-4 w-4" />
            </Button>
          </Alert>
        </div>
      )}

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Apply for{" "}
            {schoolType === "middle-school" ? "Middle School" : "High School"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => navigate("/apply")}
            variant="outline"
            className="mb-6 w-full"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Application Types
          </Button>
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {step === 1 && (
                  <>
                    <div className="flex flex-col sm:flex-row">
                      <div>
                        <Label htmlFor="title">คำนำหน้าชื่อ</Label>
                        <select
                          id="title"
                          name="title"
                          onChange={handleInputChange}
                          required
                          className="mt-1 p-2 block w-full border rounded-md text-base"
                        >
                          <option value="">เลือกคำนำหน้าชื่อ</option>
                          <option value="เด็กชาย">เด็กชาย</option>
                          <option value="เด็กหญิง">เด็กหญิง</option>
                          <option value="นาย">นาย</option>
                          <option value="นางสาว">นางสาว</option>
                        </select>
                      </div>
                      <div className="flex-1 sm:pl-5">
                        <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1 p-2 block w-full border rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nationalId">บัตรประชาชน</Label>
                      <Input
                        id="nationalId"
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dob">วัน/เดือน/ปีเกิด</Label>
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">อายุ</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <Label htmlFor="religion">ศาสนา</Label>
                        <Input
                          id="religion"
                          name="religion"
                          value={formData.religion}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="ethnicity">เชื้อชาติ</Label>
                        <Input
                          id="ethnicity"
                          name="ethnicity"
                          value={formData.ethnicity}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="nationality">สัญชาติ</Label>
                        <Input
                          id="nationality"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1">
                          <Label htmlFor="previousSchool">
                            โรงเรียนที่จบการศึกษา
                          </Label>
                          <Input
                            id="previousSchool"
                            name="previousSchool"
                            value={formData.previousSchool}
                            onChange={handleInputChange}
                            required
                            className="mt-1 w-full"
                          />
                        </div>
                        <div className="sm:pl-5">
                          <Label htmlFor="gpa">เกรดเฉลี่ย</Label>
                          <Input
                            id="gpa"
                            name="gpa"
                            type="number"
                            value={formData.gpa}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                            step="0.01"
                            min="0"
                            max="4"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <Label htmlFor="previousSchool">ความสามารถพิเศษ / ความสนใจ</Label>
                      <Input
                        id="previousSchool"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div> */}
                    <div>
                      <Label htmlFor="gradeApplyingFor">
                        แผนการเรียน
                      </Label>
                      <Input
                        id="gradeApplyingFor"
                        name="gradeApplyingFor"
                        value={formData.gradeApplyingFor}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <div
                  type="button"
                  onClick={handlePrevStep}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  <span>Back</span>
                </div>
              )}

              {step < 2 && (
                <div
                  type="button"
                  onClick={handleNextStep}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  <span>Next</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </div>
              )}

              {step === 2 && (
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Application <Send className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;
