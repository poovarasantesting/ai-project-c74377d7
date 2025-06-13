import { useState, useEffect } from "react";
import { Save, Download, FileUp, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DocumentList from "@/components/DocumentList";

export default function Editor() {
  const [text, setText] = useState<string>("");
  const [documentName, setDocumentName] = useState<string>("Untitled Document");
  const [documents, setDocuments] = useState<{ id: string; name: string; content: string }[]>([]);
  const { toast } = useToast();

  // Load documents from localStorage on initial render
  useEffect(() => {
    const savedDocs = localStorage.getItem("textEditor_documents");
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
  }, []);

  // Save documents to localStorage when they change
  useEffect(() => {
    localStorage.setItem("textEditor_documents", JSON.stringify(documents));
  }, [documents]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const saveDocument = () => {
    const id = crypto.randomUUID();
    const newDoc = { id, name: documentName, content: text };
    
    setDocuments(prev => {
      // Check if a document with this name already exists
      const existingDocIndex = prev.findIndex(doc => doc.name === documentName);
      
      if (existingDocIndex >= 0) {
        // Update existing document
        const updatedDocs = [...prev];
        updatedDocs[existingDocIndex] = { ...prev[existingDocIndex], content: text };
        return updatedDocs;
      } else {
        // Add new document
        return [...prev, newDoc];
      }
    });

    toast({
      title: "Document Saved",
      description: `"${documentName}" has been saved successfully.`,
    });
  };

  const loadDocument = (doc: { id: string; name: string; content: string }) => {
    setText(doc.content);
    setDocumentName(doc.name);
    
    toast({
      title: "Document Loaded",
      description: `"${doc.name}" has been loaded.`,
    });
  };

  const downloadDocument = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${documentName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Document Downloaded",
      description: `"${documentName}.txt" has been downloaded.`,
    });
  };

  const uploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
      setDocumentName(file.name.replace(/\.[^/.]+$/, "")); // Remove file extension
      
      toast({
        title: "Document Uploaded",
        description: `"${file.name}" has been uploaded.`,
      });
    };
    reader.readAsText(file);
  };

  const applyFormatting = (format: string) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    
    let newText = text;
    let newCursorPos = end;
    
    switch (format) {
      case "bold":
        newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
        newCursorPos = end + 4;
        break;
      case "italic":
        newText = text.substring(0, start) + `_${selectedText}_` + text.substring(end);
        newCursorPos = end + 2;
        break;
      case "underline":
        newText = text.substring(0, start) + `<u>${selectedText}</u>` + text.substring(end);
        newCursorPos = end + 7;
        break;
      default:
        break;
    }
    
    setText(newText);
    
    // Re-focus and set cursor position after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };
  
  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="documents">My Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Text Editor</CardTitle>
                <div className="flex space-x-1">
                  <input
                    type="text"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    className="px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Document name"
                  />
                  <Button size="sm" onClick={saveDocument}>
                    <Save className="h-4 w-4 mr-1" /> Save
                  </Button>
                  <Button size="sm" onClick={downloadDocument} variant="outline">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                  <Button size="sm" variant="outline" className="relative">
                    <FileUp className="h-4 w-4 mr-1" /> Upload
                    <input
                      type="file"
                      accept=".txt"
                      onChange={uploadDocument}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-t flex space-x-1">
                <Button size="icon" variant="ghost" onClick={() => applyFormatting("bold")}>
                  <Bold className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => applyFormatting("italic")}>
                  <Italic className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => applyFormatting("underline")}>
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="border-r mx-1 border-slate-300 dark:border-slate-600" />
                <Button size="icon" variant="ghost">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Start typing here..."
                className="min-h-[300px] font-mono resize-y rounded-t-none"
              />
            </CardContent>
            
            <CardFooter className="flex justify-between border-t p-4 text-xs text-muted-foreground">
              <div>Characters: {text.length}</div>
              <div>Words: {text.trim() === "" ? 0 : text.trim().split(/\s+/).length}</div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <DocumentList documents={documents} onLoadDocument={loadDocument} />
        </TabsContent>
      </Tabs>
    </div>
  );
}