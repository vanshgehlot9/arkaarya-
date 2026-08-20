"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Eye } from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import { updateLegalDocument } from "../actions";

export default function EditLegalClient({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [doc, setDoc] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [savedMode, setSavedMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }
      }),
      Underline,
      LinkExtension.configure({ openOnClick: false })
    ],
    content: doc.content,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[500px] py-4'
      }
    }
  });

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editor) return;
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const htmlContent = editor.getHTML();

    const updates = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      version: formData.get("version") as string,
      effective_date: formData.get("effective_date") as string || null,
      summary: formData.get("summary") as string,
      content: htmlContent
    };

    const result = await updateLegalDocument(doc.id, updates);
    if (!result.error) {
      setDoc(result.doc);
      setSavedMode(true);
      setTimeout(() => setSavedMode(false), 2000);
    }
    setLoading(false);
  };

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };


  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/legal"
          className="flex items-center gap-2 text-[#5E6672] hover:text-[#00264A] font-semibold transition-colors"
        >
          <ArrowLeft size={18} /> Back to Documents
        </Link>
        <div className="flex gap-3">
          <a 
            href={`/legal/${doc.slug}?preview=true`}
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E3E8E4] rounded-lg text-sm font-semibold text-[#00264A] hover:bg-gray-50"
          >
            <Eye size={16} /> Preview
          </a>
          <button 
            type="submit"
            form="edit-legal-form"
            disabled={loading || savedMode}
            id="save-btn"
            className="flex items-center gap-2 px-6 py-2 bg-[#00264A] text-white rounded-lg text-sm font-semibold hover:bg-[#001A33] disabled:opacity-70 transition-all w-36 justify-center"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : savedMode ? "Saved!" : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>

      <form id="edit-legal-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Editor */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E3E8E4] overflow-hidden flex flex-col">
          
          {/* Tiptap Toolbar */}
          <div className="border-b border-[#E3E8E4] p-2 flex flex-wrap items-center gap-1 bg-[#F8FAF7] min-h-[56px]">
            {mounted && editor && (
              <>
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-200 font-bold ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}>B</button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-200 italic ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}>I</button>
                <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded hover:bg-gray-200 underline ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}>U</button>
                <div className="w-px h-6 bg-gray-300 mx-2" />
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded hover:bg-gray-200 font-bold ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}>H1</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded hover:bg-gray-200 font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}>H2</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded hover:bg-gray-200 font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}>H3</button>
                <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('paragraph') ? 'bg-gray-200' : ''}`}>P</button>
                <div className="w-px h-6 bg-gray-300 mx-2" />
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}>• List</button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}>1. List</button>
                <div className="w-px h-6 bg-gray-300 mx-2" />
                <button type="button" onClick={setLink} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}>Link</button>
                <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-2 rounded hover:bg-gray-200">—</button>
              </>
            )}
          </div>

          <div className="p-8 flex-1 overflow-y-auto max-h-[800px]">
            {mounted && editor ? <EditorContent editor={editor} /> : <div className="min-h-[500px] flex items-center justify-center text-gray-400"><Loader2 className="animate-spin" /></div>}
          </div>
        </div>

        {/* Right Col: Meta settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E3E8E4] p-6 space-y-5">
            <h3 className="font-bold text-[#00264A] text-lg border-b border-[#E3E8E4] pb-4">Document Metadata</h3>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#5E6672]">Title</label>
              <input type="text" name="title" defaultValue={doc.title} required className="w-full px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13]" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#5E6672]">Version</label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-[#F8FAF7] border border-r-0 border-[#E3E8E4] rounded-l-lg text-[#5E6672] font-semibold text-sm">v</span>
                <input type="text" name="version" defaultValue={doc.version} required placeholder="1.0" className="w-full px-4 py-2 rounded-r-lg border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13]" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#5E6672]">URL Slug</label>
              <input type="text" name="slug" defaultValue={doc.slug} required className="w-full px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13]" />
              <p className="text-xs text-gray-500 mt-1">/legal/{doc.slug}</p>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#5E6672]">Effective Date</label>
              <input type="date" name="effective_date" defaultValue={doc.effective_date} className="w-full px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13]" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#5E6672]">Summary (Meta Description)</label>
              <textarea name="summary" rows={3} defaultValue={doc.summary} className="w-full px-4 py-2 rounded-lg border border-[#E3E8E4] focus:border-[#629A13] focus:ring-1 focus:ring-[#629A13] text-sm"></textarea>
            </div>
          </div>

          <div className="bg-[#F8FAF7] rounded-2xl shadow-sm border border-[#E3E8E4] p-6 space-y-3">
             <div className="flex justify-between text-sm">
                <span className="text-[#5E6672] font-semibold">Status</span>
                <span className="font-bold uppercase text-[#00264A]">{doc.status}</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-[#5E6672] font-semibold">Type</span>
                <span className="font-bold text-[#00264A]">{doc.document_type}</span>
             </div>
             <p className="text-xs text-gray-400 mt-4 leading-relaxed">
               Changes to metadata and content must be saved manually. If the document is published, changes will reflect instantly on the public website.
             </p>
          </div>
        </div>

      </form>
    </div>
  );
}
