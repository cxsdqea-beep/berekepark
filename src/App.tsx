import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Building3DModel } from './components/Building3DModel';
import { Concept } from './components/Concept';
import { Gallery } from './components/Gallery';
import { ConstructionProgress } from './components/ConstructionProgress';
import { Layouts } from './components/Layouts';
import { Infrastructure } from './components/Infrastructure';
import { LeadForm } from './components/LeadForm';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { ModalLayoutDetail } from './components/ModalLayoutDetail';
import { LightboxModal } from './components/LightboxModal';
import { ModalConsultation } from './components/ModalConsultation';
import type { ApartmentLayout, GalleryItem } from './types';
import { GALLERY_DATA } from './data/projectData';
import { LanguageProvider } from './context/LanguageContext';

export function App() {
  const [selectedLayout, setSelectedLayout] = useState<ApartmentLayout | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationPresetRoom, setConsultationPresetRoom] = useState<string>('3-комнатная (140.6 м²)');

  const handleOpenConsultation = (presetRoom?: string) => {
    if (presetRoom) {
      setConsultationPresetRoom(presetRoom);
    }
    setIsConsultationOpen(true);
  };

  const handleGallerySelect = (_item: GalleryItem, index: number) => {
    setLightboxIndex(index);
  };

  const handleOpenImageModal = (imageSrc: string) => {
    const foundIdx = GALLERY_DATA.findIndex((item) => item.image === imageSrc);
    if (foundIdx !== -1) {
      setLightboxIndex(foundIdx);
    } else {
      setLightboxIndex(0);
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-brand-bg text-slate-800 selection:bg-sky-500 selection:text-white flex flex-col justify-between">
        {/* Fixed Header */}
        <Header onOpenConsultation={() => handleOpenConsultation()} />

        {/* Main Page Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero onOpenConsultation={() => handleOpenConsultation()} />

          {/* 2. Interactive 3D Architectural Model with Scroll-Driven Rotation & Beauty Lock */}
          <Building3DModel onOpenConsultation={() => handleOpenConsultation()} />

          {/* 3. Concept & Architecture & Advantages */}
          <Concept 
            onOpenConsultation={() => handleOpenConsultation()} 
            onOpenImageModal={handleOpenImageModal}
          />

          {/* 4. Catalog of Apartment Layouts */}
          <Layouts 
            onSelectLayout={(layout) => setSelectedLayout(layout)}
            onOpenConsultation={() => handleOpenConsultation()}
          />

          {/* 5. Interactive Gallery & Instagram */}
          <Gallery onSelectImage={handleGallerySelect} />

          {/* 6. Live Construction Progress (Ход строительства) */}
          <ConstructionProgress onOpenImageModal={handleOpenImageModal} />

          {/* 7. Location & Infrastructure */}
          <Infrastructure />

          {/* 8. Lead Generation Form */}
          <LeadForm />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Action Button for Mobile & Desktop (auto-hidden when any modal is active) */}
        <FloatingContact isHidden={Boolean(selectedLayout || lightboxIndex !== null || isConsultationOpen)} />

        {/* Interactive Modal: Floor Plan Zoom & Details */}
        <ModalLayoutDetail
          layout={selectedLayout}
          onClose={() => setSelectedLayout(null)}
          onBookConsultation={(roomName) => handleOpenConsultation(roomName)}
        />

        {/* Interactive Modal: Lightbox Gallery Fullscreen */}
        {lightboxIndex !== null && (
          <LightboxModal
            items={GALLERY_DATA}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={(newIdx) => setLightboxIndex(newIdx)}
          />
        )}

        {/* Interactive Modal: Consultation / Presentation Booking */}
        <ModalConsultation
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
          presetRoom={consultationPresetRoom}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
