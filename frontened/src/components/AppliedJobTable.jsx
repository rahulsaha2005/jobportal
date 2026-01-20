import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AppliedJobTable() {
  const { getAppliedJobs } = useSelector((store) => store.job);
  const status = true;
  function DateShortener(dateString) {
    if (!dateString) return "DATE";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  const navigate = useNavigate();
  console.log(getAppliedJobs);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        {/* top row */}
        <TableHeader>
          <TableRow>
            <TableHead>DATE</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right"> View Description</TableHead>
          </TableRow>
        </TableHeader>
        {/* remaining data row */}
        <TableBody>
          {[1].length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            getAppliedJobs?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{DateShortener(item?.createdAt)}</TableCell>
                <TableCell>{item?.job?.title || "JOB ROLE"}</TableCell>
                <TableCell>{item?.job?.company?.name || "XYZ"}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      item?.status === "rejected"
                        ? "bg-red-400"
                        : item?.status === "pending"
                          ? "bg-gray-400"
                          : "bg-green-400"
                    }`}
                  >
                    {item?.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end">
                  <Button onClick={
                    (e)=>
                    {
                      e.preventDefault();
                      navigate(`http://localhost:5173/description/${item?.job?._id}`)
                    }
                  }>click on me</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
