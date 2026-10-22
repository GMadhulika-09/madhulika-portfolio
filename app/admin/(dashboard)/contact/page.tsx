
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function AdminContactPage() {
  const [id, setId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function loadContact() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("contact_links")
        .select("*")
        .single();

      if (error || !data) {
        setError("Could not load contact info: " + (error?.message ?? ""));
        setFetching(false);
        return;
      }

      setId(data.id);
      setEmail(data.email ?? "");
      setGithub(data.github ?? "");
      setLinkedin(data.linkedin ?? "");
      setPhone(data.phone ?? "");
      setResumeUrl(data.resume_url ?? "");
      setProfileImageUrl(data.profile_image_url ?? "");
      setImagePreview(
        data.profile_image_url ?? "/images/madhulika-portrait.jpg"
      );
      setFetching(false);
    }

    loadContact();
  }, []);

  function chooseImage(file?: File) {
    setError("");
    setSuccess(false);

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Choose an image smaller than 5 MB.");
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const supabase = createClient();
    let newProfileImageUrl = profileImageUrl;

    try {
      if (selectedImage) {
        const extension =
          selectedImage.name.split(".").pop()?.toLowerCase() || "jpg";
        const filePath = `profile/profile-${Date.now()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("portfolio-assets")
          .upload(filePath, selectedImage, {
            contentType: selectedImage.type,
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(
            "Photo upload failed: " + uploadError.message
          );
        }

        const { data } = supabase.storage
          .from("portfolio-assets")
          .getPublicUrl(filePath);

        newProfileImageUrl = data.publicUrl;
      }

      const { error: saveError } = await supabase
        .from("contact_links")
        .update({
          email: email || null,
          github: github || null,
          linkedin: linkedin || null,
          phone: phone || null,
          resume_url: resumeUrl || null,
          profile_image_url: newProfileImageUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (saveError) {
        throw new Error("Could not save contact info: " + saveError.message);
      }

      setProfileImageUrl(newProfileImageUrl);
      setSelectedImage(null);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <main className="px-6 py-20">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="px-6 py-20 max-w-xl">
      <h1 className="text-3xl font-bold mb-8">Edit Contact Links</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">GitHub URL</label>
          <input
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Phone (optional)
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Resume URL (optional)
          </label>
          <input
            type="url"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="Link to hosted resume PDF"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="border rounded-xl p-4 flex flex-col gap-3">
          <label className="block text-sm font-medium">
            Profile picture
          </label>

          <p className="text-sm text-gray-500">
            JPG, PNG, or WebP. Maximum size: 5 MB.
          </p>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile picture preview"
              className="w-32 h-32 rounded-xl object-cover border"
            />
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => chooseImage(e.target.files?.[0])}
            className="block w-full text-sm"
          />

          {selectedImage && (
            <p className="text-sm text-gray-500">
              Selected: {selectedImage.name}
            </p>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm">Saved successfully.</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white rounded-lg py-2 text-sm font-medium hover:opacity-80 transition disabled:opacity-50 mt-2"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}
