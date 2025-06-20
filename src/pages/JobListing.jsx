import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { Search, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filter, setFilter] = useState({
    type: 'all',
    location: '',
    search: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/jobs`)
      .then(res => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch(err => console.error("Error fetching jobs:", err));
  }, [API_BASE_URL]);

  useEffect(() => {
    const { type, location, search } = filter;
    const lowerSearch = search.toLowerCase();

    const filtered = jobs.filter(job => {
      const matchesType = type === "all" || type === ""
        ? true
        : job.jobType.toLowerCase().includes(type.toLowerCase());

      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true;

      const matchesSearch = search
        ? job.title.toLowerCase().includes(lowerSearch) ||
          job.description.toLowerCase().includes(lowerSearch) ||
          job.company.toLowerCase().includes(lowerSearch)
        : true;

      return matchesType && matchesLocation && matchesSearch;
    });

    setFilteredJobs(filtered);
  }, [filter, jobs]);

  return (
    <div className="text-center px-4 py-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-10 tracking-tight">
        Find Your Dream Job
      </h1>

      {/* Filters */}
      <div className="w-full max-w-6xl mx-auto bg-transparent backdrop-blur-md p-4 rounded-xl shadow-sm mb-12 top-2 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label>Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Title / Company / Keywords"
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Job Type</Label>
            <Select
              value={filter.type}
              onValueChange={(val) => setFilter({ ...filter, type: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <SelectContent className="bg-gray-800 text-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="on-site">On-Site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </motion.div>
              </AnimatePresence>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="e.g. Bangalore"
                value={filter.location}
                onChange={(e) => setFilter({ ...filter, location: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full bg-transparent hover:bg-gray-700 hover:text-white"
              onClick={() => setFilter({ type: "all", location: "", search: "" })}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-center gap-6 px-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card
              key={job._id}
              className="w-full sm:w-[90%] md:w-[45%] lg:w-[30%] bg-gray-800 text-white rounded-2xl shadow-md transition hover:shadow-xl hover:border-primary"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-md p-1 shadow-sm flex items-center justify-center">
                    <img
                      src={job.companyImage}
                      alt={job.company}
                      className="object-contain w-10 h-10"
                    />
                  </div>
                  <div className="text-left">
                    <CardTitle className="text-xl font-semibold">{job.title}</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">{job.company}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p className="text-[15px] leading-snug">{job.description}</p>

                <div className="text-gray-400 px-4 py-2 rounded-md space-y-1">
                  <p><span className="font-medium">Location:</span> {job.location}</p>
                  <p><span className="font-medium">Salary:</span> {job.salary}</p>
                  <p><span className="font-medium">Type:</span> {job.jobType}</p>
                </div>

                <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full mt-2">Apply Now</Button>
                </a>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-lg">No jobs found matching your filters.</p>
        )}
      </div>
    </div>
  );
};

export default JobListing;
