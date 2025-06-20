import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import axios from 'axios';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    companyImage: '',
    description: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    applyLink: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSelect = (value) => {
    setJobData({ ...jobData, jobType: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/jobs`, jobData);
      alert("Job posted successfully!");
      setJobData({
        title: '',
        company: '',
        companyImage: '',
        description: '',
        location: '',
        salary: '',
        jobType: 'full-time',
        applyLink: ''
      });
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <Card className="bg-gray-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Post a New Job</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input name="title" id="title" value={jobData.title} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input name="company" id="company" value={jobData.company} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyImage">Company Logo URL</Label>
              <Input name="companyImage" id="companyImage" value={jobData.companyImage} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea name="description" id="description" value={jobData.description} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input name="location" id="location" value={jobData.location} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input name="salary" id="salary" value={jobData.salary} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select value={jobData.jobType} onValueChange={handleSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-Time</SelectItem>
                  <SelectItem value="part-time">Part-Time</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="on-site">On-Site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applyLink">Application Link</Label>
              <Input name="applyLink" id="applyLink" value={jobData.applyLink} onChange={handleChange} required />
            </div>

            <Button type="submit" className="w-full mt-4">
              Post Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostJob;
