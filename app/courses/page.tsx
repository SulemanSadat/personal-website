import CourseHighlights from "../../components/CourseHighlights";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Upcoming Technology Courses", description: "Upcoming courses from Suleman Sadat covering programming, content production and ecommerce. Course enrolment is not yet open.", alternates: { canonical: "/courses" }, robots: { index: false, follow: false } };
export default function Page() { return <CourseHighlights />; }
