"use client";

import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { blogs } from "../data/blogs";

export function CaseStudiesSection() {
  const latestBlogs = [...blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section
      id="case-studies"
      className="py-24 px-8 bg-white dark:bg-[#0B1120] transition-colors duration-300"
      data-testid="section-case-studies"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
            Resources & Knowledge
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            Success Stories & <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Actionable Insights
            </span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real results, proven frameworks, and data-driven insights to help your business scale with Fast in Cloud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <Link key={blog.slug} href={`/blogs?slug=${blog.slug}`}>
              <div className="group flex flex-col h-full bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-900/10 dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-teal-600 dark:text-teal-400 shadow-sm">
                    {blog.category}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.date)}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-8 leading-relaxed flex-grow">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    Read Article 
                    <ArrowUpRight className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link href="/blogs">
            <button className="inline-flex items-center justify-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-teal-600 dark:hover:border-teal-500 text-slate-800 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 px-8 py-4 rounded-full font-bold transition-all shadow-sm group">
              View All Insights
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}