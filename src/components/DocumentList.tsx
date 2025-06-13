import { useState } from "react";
import { Trash2, Edit, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Document {
  id: string;
  name: string;
  content: string;
}

interface DocumentListProps {
  documents: Document[];
  onLoadDocument: (doc: Document) => void;
}

export default function DocumentList({ documents, onLoadDocument }: DocumentListProps) {
  const [deleteDocumentId, setDeleteDocumentId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDeleteDocument = () => {
    if (!deleteDocumentId) return;
    
    // Filter out the document to delete
    const updatedDocs = documents.filter(doc => doc.id !== deleteDocumentId);
    
    // Save to localStorage
    localStorage.setItem("textEditor_documents", JSON.stringify(updatedDocs));
    
    // Show toast notification
    const deletedDoc = documents.find(doc => doc.id === deleteDocumentId);
    toast({
      title: "Document Deleted",
      description: `"${deletedDoc?.name}" has been deleted.`,
    });
    
    // Reset the deleteDocumentId
    setDeleteDocumentId(null);
    
    // Force reload of the page to update the documents list
    window.location.reload();
  };

  if (documents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Documents</CardTitle>
        </CardHeader>
        <CardContent className="py-10 text-center text-muted-foreground">
          <FileText className="mx-auto h-10 w-10 opacity-50" />
          <p className="mt-4">No documents saved yet</p>
          <p className="text-sm">Your saved documents will appear here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {documents.map((doc) => (
            <div key={doc.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.content.length} characters • {doc.content.trim() === "" ? 0 : doc.content.trim().split(/\s+/).length} words
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="ghost" onClick={() => onLoadDocument(doc)}>
                  <Edit className="h-4 w-4 mr-1" /> Open
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={() => setDeleteDocumentId(doc.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <AlertDialog open={deleteDocumentId !== null} onOpenChange={(open) => !open && setDeleteDocumentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the document.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDocument} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}