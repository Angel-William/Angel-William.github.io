import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Eye, 
  X, 
  ExternalLink,
  Calendar,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';

// Type definitions
interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  duration: string;
  skills: string[];
  certificateId: string;
  instructor: string;
  pdfUrl: string;
  thumbnailColor: string;
}

interface CertificationsProps {
  className?: string;
}


const Certifications: React.FC<CertificationsProps> = ({ className = '' }) => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const openCertificate = (cert: Certificate): void => {
    setSelectedCert(cert);
  };

  const closeCertificate = (): void => {
    setSelectedCert(null);
  };

  const handleDownload = (url: string): void => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openPdfInNewTab = (url: string): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="certifications" className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Header with Japanese aesthetic */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <div className="inline-block">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight mb-4">
              証書
              <span className="block text-2xl md:text-3xl text-gray-600 mt-2 font-normal">
                Certifications
              </span>
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
          </div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            学びの軌跡 - The path of learning
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: cert.id * 0.1 }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => setHoveredCard(cert.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full">
                {/* Decorative Japanese pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    ))}
                  </div>
                </div>

                {/* Thumbnail */}
                <div className={`h-40 bg-gradient-to-br ${cert.thumbnailColor} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Award className="w-12 h-12 text-gray-700" />
                    </div>
                  </div>
                  {/* Issuer Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-700 rounded-full border border-gray-300">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {cert.title}
                  </h3>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{cert.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{cert.duration}</span>
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      ID: {cert.certificateId.substring(0, 20)}...
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openCertificate(cert)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 group/btn"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => handleDownload(cert.pdfUrl)}
                      className="p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      title="Download PDF"
                      aria-label="Download certificate PDF"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Hover effect line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${hoveredCard === cert.id ? 'scale-x-100' : ''}`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Japanese aesthetic quote */}
        <div className="mt-16 text-center">
          <div className="inline-block border-t border-b border-gray-300 py-4">
            <p className="text-gray-700 italic">
              "継続は力なり" – <span className="not-italic text-gray-600">Continuous effort is strength</span>
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCertificate}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {selectedCert.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{selectedCert.issuer}</p>
                  </div>
                  <button
                    onClick={closeCertificate}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  {/* Certificate Info */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Instructor</h3>
                        <p className="text-gray-900">{selectedCert.instructor}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Completed</h3>
                        <p className="text-gray-900">{selectedCert.date}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Certificate ID</h3>
                        <p className="font-mono text-sm text-gray-900 break-all">
                          {selectedCert.certificateId}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Duration</h3>
                        <p className="text-gray-900">{selectedCert.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Skills Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* PDF Preview Placeholder */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                    <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">PDF Certificate Preview</p>
                    <p className="text-sm text-gray-500 mb-6">
                      Certificate ID: {selectedCert.certificateId}
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => openPdfInNewTab(selectedCert.pdfUrl)}
                        className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open PDF
                      </button>
                      <button
                        onClick={() => handleDownload(selectedCert.pdfUrl)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifications;