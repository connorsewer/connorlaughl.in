import { groq } from 'next-sanity'

export const heroContentQuery = groq`*[_type == "heroContent"][0]{
  _id,
  headline,
  subheadline,
  tagline,
  stats,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  profileImage
}`

export const caseStudiesQuery = groq`*[_type == "caseStudy"]|order(order asc){
  _id,
  title,
  slug,
  label,
  deck,
  outcome,
  scope,
  stack,
  governance,
  bullets,
  featured,
  order,
  heroImage
}`

export const featuredCaseStudiesQuery = groq`*[_type == "caseStudy" && featured == true]|order(order asc){
  _id,
  title,
  slug,
  label,
  deck,
  outcome,
  scope,
  featured,
  order,
  heroImage
}`

export const caseStudyBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  label,
  deck,
  outcome,
  scope,
  stack,
  governance,
  bullets,
  interviewLine,
  longformContent,
  featured,
  order,
  heroImage,
  ogImage,
  metaTitle,
  metaDescription
}`

export const proofPointsQuery = groq`*[_type == "proofPoint" && featured == true]|order(order asc){
  _id,
  title,
  metric,
  description,
  order
}`

export const servicesQuery = groq`*[_type == "service"]|order(order asc){
  _id,
  title,
  description,
  order
}`

export const pageContentQuery = groq`*[_type == "pageContent" && page == $page][0]{
  _id,
  page,
  sections,
  seo
}`