import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Card } from '../Card';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { SparklesIcon } from '../icons/SparklesIcon';
import { ClipboardIcon } from '../icons/ClipboardIcon';

export const AiContentGenerator: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [contentType, setContentType] = useState('Artikel Blog');
    const [audience, setAudience] = useState('Pemula');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerateContent = async () => {
        if (!topic) {
            setError('Topik tidak boleh kosong.');
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedContent('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Anda adalah seorang ahli dalam edukasi trading forex, crypto, dan bisnis. Buatkan konten jenis "${contentType}" untuk audiens tingkat "${audience}" dengan topik "${topic}". Konten harus informatif, terstruktur dengan baik, menggunakan bahasa yang jelas, dan memberikan nilai praktis. Jika membuat artikel, sertakan judul yang menarik, pendahuluan, beberapa poin utama dengan penjelasan, dan kesimpulan.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setGeneratedContent(response.text);
        } catch (err) {
            console.error("Error generating content:", err);
            setError('Gagal menghasilkan konten. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <Card title="AI Content Generator" description="Buat draf materi edukasi secara instan dengan bantuan AI.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                     <Input
                        label="Topik Materi"
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., Analisa Teknikal Candlestick"
                    />
                </div>
                <Select
                    label="Jenis Konten"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    options={['Artikel Blog', 'Penjelasan Singkat', 'Studi Kasus']}
                />
                <Select
                    label="Target Audiens"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    options={['Pemula', 'Menengah', 'Ahli']}
                />
            </div>
            <div className="mt-6">
                <Button onClick={handleGenerateContent} disabled={isLoading}>
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </div>
                    ) : (
                         <div className="flex items-center justify-center">
                            <SparklesIcon /> <span className="ml-2">Generate Content</span>
                        </div>
                    )}
                </Button>
            </div>

            {error && <p className="mt-4 text-center text-red-400">{error}</p>}

            {generatedContent && (
                <div className="mt-8 border-t border-brand-border pt-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white">Generated Content:</h3>
                        <Button onClick={handleCopy} variant="secondary" className="!w-auto px-4 !py-2 text-sm">
                           <ClipboardIcon />
                           <span className="ml-2">{isCopied ? 'Copied!' : 'Copy'}</span>
                        </Button>
                    </div>
                    <textarea
                        readOnly
                        value={generatedContent}
                        className="mt-4 w-full h-96 bg-brand-primary border border-brand-border rounded-md p-4 text-brand-text-primary focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"
                    />
                </div>
            )}
        </Card>
    );
};