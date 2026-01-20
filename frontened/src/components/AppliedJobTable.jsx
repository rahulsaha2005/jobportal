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
import { Badge } from "./ui/badge";

export default function AppliedJobTable() {
  const status = true;
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        {/* top row */}
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
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
            [1, 2, 3, 4].map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>date</TableCell>
                <TableCell>title</TableCell>
                <TableCell>company name</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      status === "rejected"
                        ? "bg-red-400"
                        : status === "pending"
                          ? "bg-gray-400"
                          : "bg-green-400"
                    }`}
                  >
                    passed
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
