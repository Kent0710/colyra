"use client";

import { Upload, FileText, X, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { uploadResourceFile } from "@/actions/resource";

const acceptedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/gif",
];

const maxFileSize = 10 * 1024 * 1024; // 10MB

const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!acceptedMimeTypes.includes(file.type)) {
        return { 
            valid: false, 
            error: "Please select a valid file type (PDF, DOCX, DOC, TXT, JPG, PNG, GIF)" 
        };
    }
    if (file.size > maxFileSize) {
        return { 
            valid: false, 
            error: "File size must be less than 10MB" 
        };
    }
    return { valid: true };
};

interface UploadedMaterialsProps {
    spaceId: string;
}

const UploadedMaterials: React.FC<UploadedMaterialsProps> = ({ spaceId }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = useCallback((files: FileList | File[]) => {
        const fileArray = Array.from(files);
        const firstFile = fileArray[0];
        
        if (!firstFile) return;

        const validation = validateFile(firstFile);
        if (validation.valid) {
            setSelectedFile(firstFile);
            toast.success(`File "${firstFile.name}" selected successfully`);
        } else {
            toast.error(validation.error);
        }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files);
        }
    }, [handleFileSelect]);

    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files);
        }
        // Clear the input so the same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [handleFileSelect]);

    const handleRemoveFile = useCallback(() => {
        setSelectedFile(null);
        toast.success("File removed");
    }, []);

    const handleClearAll = useCallback(() => {
        setSelectedFile(null);
        toast.success("File cleared");
    }, []);

    const handleSubmit = async () => {
        if (!selectedFile) {
            toast.error("Please select a file to upload");
            return;
        }

        if (!spaceId) {
            toast.error("Space ID is required");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const result = await uploadResourceFile(selectedFile, spaceId);
            
            if (result.success) {
                toast.success("File uploaded successfully!");
                setSelectedFile(null);
            } else {
                toast.error(result.error || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error(
                `Upload failed: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-4">
            {/* Drag and Drop Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                    isDragOver
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50 scale-[1.02]"
                        : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
                } ${selectedFile ? "border-green-400 bg-green-50 dark:bg-green-950/20" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload className={`mx-auto h-12 w-12 ${selectedFile ? "text-green-500" : "text-gray-400"}`} />
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {selectedFile 
                            ? `File selected: ${selectedFile.name}. Click to replace.`
                            : "Drop your file here, or click to browse"
                        }
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Supports PDF, DOCX, DOC, TXT, JPG, PNG, GIF files up to 10MB
                    </p>
                </div>
            </div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt,.jpg,.jpeg,.png,.gif"
                onChange={handleFileInputChange}
                className="hidden"
            />

            {/* Selected File Display */}
            {selectedFile && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Selected File
                        </h3>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearAll}
                            disabled={isSubmitting}
                        >
                            Clear
                        </Button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border">
                        <div className="flex items-center justify-between p-3">
                            <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-48">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatFileSize(selectedFile.size)}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleRemoveFile}
                                disabled={isSubmitting}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            {selectedFile && (
                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !selectedFile}
                        className="min-w-32"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <CloudUpload className="h-4 w-4 mr-2" />
                                Upload File
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default UploadedMaterials;
