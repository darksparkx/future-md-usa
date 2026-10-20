"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { controlClass } from "@/components/page-title";
import { useDemo } from "@/lib/demo-store";

export default function ProgramsPage() {
  const { state } = useDemo();
  const [specialty, setSpecialty] = useState("All");
  const specialties = ["All", ...new Set(state.programs.map((program) => program.specialty))];
  const visible = state.programs.filter((program) => specialty === "All" || program.specialty === specialty);

  return (
    <main>
      <h1 className="text-4xl">Program list</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        A private list the staff maintain. Filter by specialty, then add a program to a student from that student’s file. Every important fact has a source and a date. This is not a public directory, and it does not say who will match.
      </p>
      <label className="mt-6 grid max-w-xs gap-1.5 text-sm">
        Specialty
        <select className={controlClass} value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
          {specialties.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <div className="mt-4 border border-border bg-card/70">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>IMG</TableHead>
              <TableHead>Visa</TableHead>
              <TableHead>Checked</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="whitespace-normal">
                  <p className="font-medium">{program.name}</p>
                  <p className="text-xs text-muted-foreground">{program.specialty} · {program.location}</p>
                  <p className="mt-1 text-xs">{program.requirements}</p>
                </TableCell>
                <TableCell className="max-w-xs whitespace-normal text-xs">{program.img}</TableCell>
                <TableCell className="max-w-xs whitespace-normal text-xs">{program.visa}</TableCell>
                <TableCell className="whitespace-normal text-xs">
                  {program.verified}
                  <p className="text-muted-foreground">{program.source}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
