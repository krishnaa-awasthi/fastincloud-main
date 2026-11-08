import { useState, useEffect } from "react";
import { useSearch } from "wouter";
import { blogs, type Blog } from "../data/blogs";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DemoModal } from "@/components/DemoModal";

export default function BlogsPage() {
  const searchString = useSearch();
  const [openBlog, setOpenBlog] = useState<Blog | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const slug = params.get("slug");
    if (slug) {
      const match = blogs.find((b) => b.slug === slug);
      if (match) setOpenBlog(match);
    }
  }, [searchString]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <Navbar onBookDemo={() => setIsDemoModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0B1120]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
              All <span className="text-teal-600 dark:text-teal-400">Insights</span> & Articles
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-4">
              Explore our complete archive of regulatory compliance guides, data strategies, and enterprise insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card
                key={blog.slug}
                className="flex flex-col overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setOpenBlog(blog)}
              >
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex flex-col flex-grow">
                  <Badge
                    variant="secondary"
                    className="w-fit mb-3 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800"
                  >
                    {blog.category}
                  </Badge>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">{blog.date}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-teal-600 dark:text-teal-400 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/30 font-bold p-0 h-auto"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Blog Detail Dialog Drawer */}
        <Dialog open={!!openBlog} onOpenChange={(v) => !v && setOpenBlog(null)}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl">
            {openBlog && (
              <div className="space-y-6">
                <DialogHeader>
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 mb-2">
                    <span>{openBlog.category}</span>
                    <span>•</span>
                    <span>{openBlog.date}</span>
                  </div>
                  <DialogTitle className="text-2xl sm:text-3xl font-extrabold leading-tight text-left">
                    {openBlog.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="aspect-video overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <img
                    src={openBlog.image}
                    alt={openBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="prose dark:prose-invert max-w-none pt-2">
                  {openBlog.content}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      {/* Footer */}
      <Footer />

      {/* Request Audit Modal */}
      <DemoModal
        open={isDemoModalOpen}
        onOpenChange={setIsDemoModalOpen}
      />
    </div>
  );
}