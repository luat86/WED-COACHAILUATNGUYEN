import React, { useState, createContext, useContext } from 'react';
import { Menu, X, Download, ChevronRight, Check, Zap, BookOpen, User, ArrowRight, BrainCircuit, GraduationCap, Shield, Smartphone, PlayCircle, FileText, CheckCircle, Lock, MessageCircle, Send, Youtube, QrCode, Phone, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AdminContext = createContext({ isAdmin: false, setIsAdmin: (val: boolean) => {} });
export const useAdmin = () => useContext(AdminContext);

const Navbar = ({ onConsultClick }: { onConsultClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md fixed top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl text-[#0b3a64] tracking-tight uppercase md:text-2xl">
              Nguyễn Văn Luật
            </span>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            <a href="#about" className="text-sm font-semibold text-[#0b3a64] hover:text-blue-600 transition">GIỚI THIỆU</a>
            <a href="#tools" className="text-sm font-semibold text-[#0b3a64] hover:text-blue-600 transition">CÔNG CỤ AI</a>
            <a href="#elearning" className="text-sm font-semibold text-[#0b3a64] hover:text-blue-600 transition">KHÓA HỌC</a>
          </div>

          <div className="hidden md:flex items-center">
            <button 
              onClick={onConsultClick}
              className="bg-[#0b3a64] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-900 transition shadow-sm"
            >
              Tư vấn ngay
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#0b3a64]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-2 shadow-xl absolute w-full z-50"
          >
            <a href="#about" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-[#0b3a64] border-b border-gray-50">Giới thiệu</a>
            <a href="#tools" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-[#0b3a64] border-b border-gray-50">Công cụ AI</a>
            <a href="#elearning" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-[#0b3a64]">Khóa học</a>
            <button 
              onClick={() => {
                setIsOpen(false);
                onConsultClick();
              }}
              className="w-full text-center mt-4 bg-[#0b3a64] text-white px-4 py-4 rounded-xl font-bold"
            >
              Tư vấn ngay
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AboutSection = ({ onConsultClick }: { onConsultClick: () => void }) => {
  const { isAdmin } = useAdmin();
  const [avatarImage, setAvatarImage] = useState(() => {
    try {
      const saved = localStorage.getItem('avatarImage');
      return saved && saved.startsWith('data:image') ? saved : '/Luat.png';
    } catch (e) {
      return '/Luat.png';
    }
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (isAdmin) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File quá lớn. Vui lòng chọn ảnh dưới 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarImage(base64String);
        try {
          localStorage.setItem('avatarImage', base64String);
        } catch (e) {
          console.error("Local storage error:", e);
          alert("Không thể lưu ảnh vào bộ nhớ trình duyệt vì vượt dung lượng cho phép.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="about" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center min-h-[600px]">
        {/* Content Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-center space-y-8 order-2 lg:order-1"
        >
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-blue-500 uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-0.5 bg-blue-500"></span>
              COACH AI
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0b3a64] leading-[1.1] tracking-tight whitespace-nowrap">
              NGUYỄN VĂN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b3a64] to-blue-500">LUẬT</span>
            </h1>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-600 italic tracking-wide">
              "Kỹ Năng Giao Việc - Chìa Khóa biến AI thành Trợ Thủ"
            </h3>
          </div>
          
          <div className="text-gray-600 md:text-lg leading-relaxed space-y-4 max-w-xl">
            <p>
              Chuyên gia quản lý dự án với hơn <strong>15 năm kinh nghiệm thực chiến</strong> trong ngành xây dựng cao tầng.
            </p>
            <p>
              Hiện nay, CEO công ty thiết kế xây dựng phố xanh tập trung phát triển mô hình <strong>Trí tuệ Nhân tạo (AI)</strong> vào quản lý dự án xây dựng, nhằm nâng cao năng lực quản lý chất lượng dự án và tối ưu hóa hiệu suất làm việc kỹ sư.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={onConsultClick}
              className="bg-[#0b3a64] text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center hover:bg-blue-900 transition-all hover:shadow-lg active:scale-95 group"
            >
               Đặt lịch tư vấn
               <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
          
          <div className="pt-8 border-t border-gray-100 mt-8">
            <h3 className="font-bold text-[#0b3a64] text-lg mb-4 flex items-center gap-2">
              <span className="w-6 h-1 bg-red-500 rounded-full"></span>
              Đây có phải lý do bạn ngại ứng dụng AI?
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
               <ul className="space-y-3">
                 <li className="flex items-start gap-3 text-gray-600 text-sm">
                   <div className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5"><X size={12} strokeWidth={3} /></div>
                   <span>Không tự tin vào năng lực của chính mình</span>
                 </li>
                 <li className="flex items-start gap-3 text-gray-600 text-sm">
                   <div className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5"><X size={12} strokeWidth={3} /></div>
                   <span>Không biết cách giao việc cho AI</span>
                 </li>
                 <li className="flex items-start gap-3 text-gray-600 text-sm">
                   <div className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5"><X size={12} strokeWidth={3} /></div>
                   <span>Không biết cách kiểm soát AI</span>
                 </li>
               </ul>

               <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10">
                   <BrainCircuit size={80} />
                 </div>
                 <p className="text-sm text-gray-700 mb-3 font-medium relative z-10 leading-relaxed">
                   Nếu đúng thì hãy tham gia vào khóa học & tài liệu miễn phí. <strong className="text-blue-600 focus:outline-none">Tôi giúp bạn:</strong>
                 </p>
                 <ul className="space-y-2 relative z-10">
                   <li className="flex items-center gap-2 text-sm font-bold text-[#0b3a64]">
                     <CheckCircle className="text-green-500 shrink-0" size={16} />
                     Tự tin
                   </li>
                   <li className="flex items-center gap-2 text-sm font-bold text-[#0b3a64]">
                     <CheckCircle className="text-green-500 shrink-0" size={16} />
                     Công thức giao việc AI
                   </li>
                   <li className="flex items-center gap-2 text-sm font-bold text-[#0b3a64]">
                     <CheckCircle className="text-green-500 shrink-0" size={16} />
                     Phương pháp kiểm soát AI
                   </li>
                 </ul>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Image Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px]">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-blue-50 rounded-full transform translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-cyan-50/50 rounded-full transform -translate-x-3 -translate-y-3 md:-translate-x-6 md:-translate-y-6 scale-105"></div>
            
            {/* Image container */}
            <div 
              className={`absolute inset-0 rounded-full border-8 border-white overflow-hidden shadow-2xl relative z-10 bg-gray-100 flex items-center justify-center text-gray-300 ${isAdmin ? 'group cursor-pointer' : ''}`}
              onClick={handleImageClick}
            >
              <img 
                src={avatarImage} 
                alt="Chuyên gia Quản lý Dự án & AI Nguyễn Văn Luật" 
                className={`w-full h-full object-cover ${isAdmin ? 'group-hover:opacity-80 transition-opacity' : ''}`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '0';
                }}
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '1';
                }}
              />
              {isAdmin && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium text-sm text-center">Nhấn để<br/>cập nhật ảnh</span>
                </div>
              )}
              {isAdmin && (
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              )}
            </div>

            {/* Floating badge 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ y: [0, -10, 0] }}
              viewport={{ once: true }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                opacity: { delay: 0.6, duration: 0.4 },
              }}
              className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-12 bg-white p-4 md:p-5 rounded-2xl md:rounded-[2rem] shadow-xl z-20 flex items-center gap-4 hidden sm:flex border border-gray-50"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <BrainCircuit size={24} />
              </div>
              <div className="whitespace-nowrap">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Chuyên gia</p>
                <p className="font-black text-[#0b3a64] text-sm md:text-base">Quản lý Dự án & AI</p>
              </div>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              animate={{ y: [0, 8, 0] }}
              viewport={{ once: true }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
                opacity: { delay: 0.8, duration: 0.4 },
              }}
              className="absolute -top-4 -right-2 md:top-8 md:-right-8 bg-white p-3 md:p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-gray-50"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div className="whitespace-nowrap">
                <p className="font-black text-[#0b3a64] text-sm">15+ Năm</p>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Kinh nghiệm</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ToolAISection = ({ onConsultClick }: { onConsultClick: () => void }) => {
  const tools = [
    { 
      title: "Sổ tay số pháp lý (AI Legal)", 
      desc: "Hệ thống tra cứu thông minh toàn bộ văn bản quy phạm pháp luật, nghị định, thông tư trong ngành xây dựng và đấu thầu.", 
      icon: <Zap size={40} />,
      url: "https://playbot-bi-d.vercel.app/"
    },
    { 
      title: "Sổ tay số chất lượng (AI Quality)", 
      desc: "Trợ lý hỗ trợ giải đáp tức thời các tiêu chuẩn kỹ thuật, quy trình nghiệm thu và quản lý chất lượng tại công trường.", 
      icon: <ShieldCheck size={40} />,
      url: "https://bot-qc-1.vercel.app/"
    }
  ];

  return (
    <section id="tools" className="w-full bg-[#0b3a64] py-24 mb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-blue-400"></span> Công cụ AI độc quyền <span className="w-8 h-px bg-blue-400"></span>
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">Hệ Sinh Thái Sổ Tay Số</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <a 
              key={tool.title}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-300 flex flex-col group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                {tool.icon}
              </div>
              <div className="w-20 h-20 bg-blue-500/20 rounded-3xl flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform relative z-10">
                {tool.icon}
              </div>
              <h4 className="text-2xl font-black text-white mb-4 relative z-10">{tool.title}</h4>
              <p className="text-blue-100/70 text-lg leading-relaxed mb-10 flex-1 relative z-10">
                {tool.desc}
              </p>
              <div 
                className="bg-blue-500 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 group-hover:bg-blue-400 transition-all active:scale-95 text-lg w-full relative z-10 shadow-lg shadow-blue-500/20"
              >
                Trải nghiệm AI ngay <ChevronRight size={20} />
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-[2rem] p-8 md:p-12 text-[#0b3a64] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <h4 className="text-3xl font-black mb-4 tracking-tight">Cần một AI riêng cho công ty bạn?</h4>
            <p className="text-gray-600 font-medium">Chúng tôi thiết kế các mô hình AI đặc thù, tích hợp trực tiếp vào quy trình làm việc hiện có của doanh nghiệp xây dựng.</p>
          </div>
          <button 
            onClick={onConsultClick}
            className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl whitespace-nowrap hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
          >
            Liên hệ tư vấn giải pháp
          </button>
        </div>
      </div>
    </section>
  );
};

const ELearningSection = ({ onSelectCourse }: { onSelectCourse: (course: any) => void }) => {
  const courses = [
    { 
      title: "AI cho Quản lý Dự án", 
      feature: "Tương tác thực tế", 
      level: "Cơ bản", 
      img: "https://images.unsplash.com/photo-1591439657448-9f4b9ce436b9?q=80&w=400&auto=format",
      lessons: [
        { id: 1, title: "Tổng quan về AI trong Xây dựng", type: "video", duration: "15:00", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { id: 2, title: "Các công cụ AI phổ biến hiện nay", type: "video", duration: "25:00", url: "https://www.w3schools.com/html/movie.mp4" },
        { id: 3, title: "Tài liệu: Hướng dẫn Prompt Engineering", type: "pdf", duration: "10 trang", url: "#" },
        { id: 4, title: "Bài tập: Quản lý rủi ro dự án với ChatGPT", type: "quiz", duration: "15 phút", url: "#" }
      ]
    },
    { 
      title: "Mastering Prompt Engineering", 
      feature: "Project Builder", 
      level: "Nâng cao", 
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format",
      lessons: [
        { id: 1, title: "Kỹ thuật Clear & Specific", type: "video", duration: "12:00", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { id: 2, title: "Phân bổ vai trò (Persona) cho AI", type: "video", duration: "18:00", url: "https://www.w3schools.com/html/movie.mp4" }
      ]
    },
    { 
      title: "Xây dựng SOP với AI", 
      feature: "Cá nhân hóa lộ trình", 
      level: "Chuyên sâu", 
      img: "https://images.unsplash.com/photo-1454165833767-027ffea9e772?q=80&w=400&auto=format",
      lessons: [
        { id: 1, title: "Quy trình chuẩn doanh nghiệp là gì?", type: "video", duration: "10:00", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { id: 2, title: "Auto-generate SOP với AI Agent", type: "video", duration: "30:00", url: "https://www.w3schools.com/html/movie.mp4" }
      ]
    }
  ];

  return (
    <section id="elearning" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 py-16 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold text-[#00d0e6] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-[#00d0e6]"></span> Học viện E-Learning
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0b3a64]">Trải nghiệm học tập thực chiến, giải quyết bài toán ngay trên lớp học.</h3>
        </div>
        <button className="text-blue-600 font-bold flex items-center gap-2 hover:underline group">
          Xem tất cả khóa học <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {courses.map((course, idx) => (
          <div 
            key={idx}
            onClick={() => onSelectCourse(course)}
            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />
            <div className="h-56 overflow-hidden relative z-10">
              <img 
                src={course.img} 
                alt={`Khóa học AI thực chiến: ${course.title}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black text-[#0b3a64] uppercase tracking-widest">
                {course.level}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b3a64]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium text-sm flex items-center gap-2">
                  <PlayCircle size={18} /> Bắt đầu học ngay
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-cyan-600 bg-cyan-50 w-fit px-3 py-1 rounded-full text-[10px] font-bold mb-4 uppercase tracking-widest">
                <Zap size={12} />
                <span>{course.feature}</span>
              </div>
              <h4 className="text-xl font-bold text-[#0b3a64] mb-6 group-hover:text-blue-600 transition-colors leading-snug">
                {course.title}
              </h4>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                <span className="text-gray-400 font-medium text-sm">Giáo trình chuẩn hóa</span>
                <button className="bg-blue-50 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CourseModal = ({ course, onClose }: { course: any; onClose: () => void }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'login' | 'otp' | 'player'>('details');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  if (step === 'player') {
    return <CourseVideoPlayer course={course} onClose={onClose} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col pt-16 md:pt-0 md:items-center justify-center p-0 md:p-4 bg-[#0b3a64]/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="w-full max-w-5xl bg-white md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-full md:h-auto md:max-h-[90vh] relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-3 bg-gray-100 hover:bg-gray-200 rounded-full z-10 transition-colors shadow-sm">
          <X size={20} />
        </button>

        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          {step === 'details' && (
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-[#0b3a64] mb-4 tracking-tight leading-snug">{course.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{course.description || "Khóa học chuyên sâu hướng dẫn ứng dụng Trí tuệ Nhân tạo vào quản lý dự án xây dựng, tối ưu năng suất và quy trình làm việc thiết thực."}</p>
                </div>
                
                <div className="bg-blue-50 p-6 md:p-8 rounded-[2rem] border border-blue-100/50">
                  <h3 className="text-xl font-black text-[#0b3a64] mb-6 flex items-center gap-3">
                    <Zap className="text-blue-500" size={24} /> Lợi ích nhận được
                  </h3>
                  <ul className="space-y-4">
                    {(course.benefits || ["Làm chủ các công cụ AI tạo sinh phổ biến nhất", "Rút ngắn 30-50% thời gian lập kế hoạch & báo cáo", "Phương pháp giao việc & kiểm soát kết quả từ AI", "Hỗ trợ 1-1 qua group kín dành riêng cho học viên"]).map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-4 text-gray-700 font-medium">
                        <CheckCircle size={20} className="text-blue-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0b3a64] mb-6">Mục lục khóa học</h3>
                  <div className="space-y-3">
                    {course.lessons.map((l: any, i: number) => (
                      <div key={l.id} className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 transition-colors p-4 md:p-5 rounded-2xl border border-gray-100/50">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm shrink-0 font-black text-lg">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-[#0b3a64]">{l.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-gray-200 text-gray-600 font-bold px-2 py-0.5 rounded uppercase tracking-wider">{l.type}</span>
                            <span className="text-[11px] text-gray-500 font-medium">{l.duration}</span>
                          </div>
                        </div>
                        {l.type === 'video' ? <PlayCircle className="text-gray-300" size={24} /> : <FileText className="text-gray-300" size={24} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[360px]">
                <div className="bg-[#0b3a64] text-white p-6 md:p-8 rounded-[2.5rem] sticky top-0 shadow-2xl">
                  <div className="mb-8">
                    <div className="aspect-video relative rounded-2xl overflow-hidden mb-6 shadow-inner">
                        <img src={course.img} alt={course.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                       <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                         <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                           <PlayCircle className="text-white" size={32} />
                         </div>
                       </div>
                    </div>
                    <p className="text-sm font-medium text-blue-200 mb-2 uppercase tracking-widest">Học phí đầu tư</p>
                    <div className="text-4xl md:text-5xl font-black text-white">{course.price || "990.000"}<span className="text-2xl text-blue-300 ml-1">đ</span></div>
                  </div>
                  <div className="space-y-4">
                    <button onClick={() => setStep('payment')} className="w-full bg-blue-500 text-white py-5 rounded-2xl font-bold hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/30 active:scale-95 text-lg">
                      Mua Khóa Học
                    </button>
                    <button onClick={() => setStep('login')} className="w-full bg-white/5 text-white py-4 rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/10 text-sm">
                      Đã mua? Đăng nhập để học
                    </button>
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-blue-200/60 font-medium">
                    <Lock size={12} /> Truy cập trọn đời, cập nhật miễn phí
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="max-w-md mx-auto text-center space-y-8 py-8">
              <div className="w-20 h-20 bg-blue-50 rounded-[1.5rem] flex items-center justify-center mx-auto text-blue-600 shadow-sm border border-blue-100">
                <QrCode size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#0b3a64] mb-3">Thanh Toán</h2>
                <p className="text-gray-600 text-base leading-relaxed">Mở ứng dụng ngân hàng và quét mã VietQR dưới đây để thanh toán khóa học <strong className="text-[#0b3a64] font-black">{course.title}</strong>.</p>
              </div>
              
              <div className="bg-white p-6 rounded-[2rem] border-2 border-gray-100 shadow-xl inline-block w-full">
                {/* Updated QR image */}
                <div className="w-full aspect-square bg-[#FBFBFC] border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden group">
                   <img src="/image_5.png" alt="VPBank QR Code" className="w-full h-full object-contain" loading="lazy" decoding="async" />
                </div>
                <div className="text-sm text-gray-700 space-y-3 text-left">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Số tiền:</span>
                    <span className="text-xl font-black text-blue-600">{course.price || "990.000"}đ</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Ngân hàng:</span>
                    <span className="font-bold text-[#0b3a64]">VPBank</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Số tài khoản:</span>
                    <span className="font-bold text-[#0b3a64]">274053208</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Người nhận:</span>
                    <span className="font-bold text-[#0b3a64]">NGUYEN VAN LUAT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Nội dung (Bắt buộc):</span>
                    <span className="font-bold text-[#0b3a64] bg-blue-50 px-2 py-1 rounded">DH {course.title.slice(0, 5).toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100/50 text-sm md:text-base text-left flex gap-4">
                <ShieldCheck className="text-blue-500 shrink-0 mt-0.5" size={24} />
                <p className="text-gray-700 leading-relaxed">Sau khi chuyển khoản thành công, hệ thống sẽ tự động đối soát và gửi <strong>mã truy cập bí mật (passcode)</strong> vào SMS/Zalo của bạn trong 2-5 phút.</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep('details')} className="flex-1 bg-gray-50 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-100 border border-gray-200 transition-all">Quay lại</button>
                <button onClick={() => setStep('login')} className="flex-[2] bg-[#0b3a64] text-white py-4 rounded-2xl font-bold hover:bg-blue-900 shadow-xl shadow-blue-900/20 transition-all active:scale-95">Đã CK & Đăng nhập</button>
              </div>
            </div>
          )}

          {step === 'login' && (
            <div className="max-w-md mx-auto text-center space-y-8 py-10">
              <div className="w-20 h-20 bg-blue-50 rounded-[1.5rem] flex items-center justify-center mx-auto text-blue-600 shadow-sm border border-blue-100">
                <Smartphone size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#0b3a64] mb-3">Đăng nhập học viên</h2>
                <p className="text-gray-600 text-base leading-relaxed">Vui lòng nhập số điện thoại lúc bạn dùng để chuyển khoản. Chúng tôi sẽ gửi Passcode đăng nhập 1 lần vào số điện thoại này.</p>
              </div>
              
              <div className="text-left space-y-3 pt-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-4">Số điện thoại liên hệ</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 0906381186" 
                    className="w-full bg-white border-2 border-gray-100 rounded-[1.5rem] pl-14 pr-6 py-5 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-lg text-[#0b3a64]"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button onClick={() => setStep('details')} className="flex-1 bg-gray-50 text-gray-700 py-5 rounded-2xl font-bold hover:bg-gray-100 border border-gray-200 transition-all">Hủy</button>
                <button onClick={() => { if(phone) setStep('otp'); }} className={`flex-[2] py-5 rounded-2xl font-bold transition-all ${phone ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/30 active:scale-95 text-lg' : 'bg-gray-100 text-gray-400 cursor-not-allowed text-lg border border-gray-200'}`}>Nhận mã Passcode</button>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="max-w-md mx-auto text-center space-y-8 py-10">
              <div className="w-20 h-20 bg-green-50 rounded-[1.5rem] flex items-center justify-center mx-auto text-green-600 shadow-sm border border-green-100">
                <Lock size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#0b3a64] mb-3">Xác thực Passcode</h2>
                <p className="text-gray-600 text-base leading-relaxed">Mã bảo mật gồm 6 số đã được gửi qua SMS/Zalo tới số điện thoại <strong className="text-[#0b3a64] font-black">{phone}</strong>.</p>
              </div>
              
              <div className="text-left space-y-3 pt-4">
                 <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-4 text-center block">Nhập mã 6 số</label>
                 <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="• • • • • •" 
                    className="w-full bg-white border-2 border-gray-100 rounded-[1.5rem] px-6 py-6 text-center tracking-[1.5em] text-3xl font-black text-[#0b3a64] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    maxLength={6}
                 />
              </div>

              <div className="flex gap-4 pt-6">
                <button onClick={() => setStep('login')} className="flex-1 bg-gray-50 text-gray-700 py-5 rounded-2xl font-bold hover:bg-gray-100 border border-gray-200 transition-all text-sm">Sửa sđt</button>
                <button onClick={() => { if(otp.length >= 4) setStep('player'); }} className={`flex-[2] py-5 rounded-2xl font-bold transition-all ${otp.length >= 4 ? 'bg-[#0b3a64] text-white hover:bg-blue-900 shadow-xl shadow-blue-900/30 active:scale-95 text-lg' : 'bg-gray-100 text-gray-400 cursor-not-allowed text-lg border border-gray-200'}`}>Vào Học Ngay</button>
              </div>
              
              <div className="pt-4">
                <p className="text-sm font-medium text-gray-500">Chưa nhận được mã? <button className="text-blue-600 font-bold ml-1 hover:underline">Gửi lại (60s)</button></p>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
};

const CourseVideoPlayer = ({ course, onClose }: { course: any; onClose: () => void }) => {
  const [activeLesson, setActiveLesson] = useState(course.lessons[0]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[200] bg-white flex flex-col md:flex-row h-screen overflow-hidden"
    >
      <div className="flex-1 flex flex-col bg-black relative">
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur transition-all"
        >
          <X size={24} />
        </button>

        <div className="flex-1 flex flex-col justify-center">
          {activeLesson.type === 'video' ? (
            <video 
              key={activeLesson.id}
              className="w-full max-h-[70vh] aspect-video outline-none"
              controls
              autoPlay
            >
              <source src={activeLesson.url} type="video/mp4" />
            </video>
          ) : (
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={48} className="text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{activeLesson.title}</h2>
              <p className="text-gray-400">Tài liệu đính kèm cho bài học này</p>
              <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Tải tài liệu (PDF)</button>
            </div>
          )}
        </div>

        <div className="p-8 bg-zinc-900 border-t border-white/5 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">{activeLesson.title}</h2>
            <span className="text-xs font-bold text-gray-400 px-2 py-1 border border-gray-700 rounded uppercase">{activeLesson.type}</span>
          </div>
          <p className="text-sm text-gray-400">Bạn đang học khóa: <span className="text-white font-medium">{course.title}</span></p>
        </div>
      </div>

      <div className="w-full md:w-[400px] bg-white border-l border-gray-100 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="font-bold text-[#0b3a64] mb-1">Nội dung khóa học</h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="w-1/3 bg-blue-600 h-full"></div>
            </div>
            <span className="text-[10px] font-bold text-gray-400">33% HOÀN THÀNH</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {course.lessons.map((lesson: any, i: number) => (
            <button 
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className={`w-full p-6 text-left flex items-start gap-4 transition-all hover:bg-gray-50 border-b border-gray-50 ${activeLesson.id === lesson.id ? 'bg-blue-50/50' : ''}`}
            >
              <div className={`mt-1 ${activeLesson.id === lesson.id ? 'text-blue-600' : 'text-gray-300'}`}>
                {lesson.id <= 1 ? <CheckCircle size={18} /> : <PlayCircle size={18} />}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold mb-1 ${activeLesson.id === lesson.id ? 'text-blue-600' : 'text-gray-400'}`}>BÀI {i + 1}</p>
                <h4 className={`text-sm font-bold leading-snug ${activeLesson.id === lesson.id ? 'text-[#0b3a64]' : 'text-gray-600'}`}>{lesson.title}</h4>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                    <Zap size={10} /> {lesson.duration}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-6 bg-gray-50/50">
          <button className="w-full bg-[#0b3a64] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
            Thảo luận bài học <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FreeResourcesSection = ({ onDownloadClick }: { onDownloadClick: () => void }) => {
  return (
    <section id="free-resources" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 pt-16">
      <div className="mb-12 text-center">
        <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
          <span className="w-8 h-px bg-cyan-600"></span> Nguồn lực miễn phí <span className="w-8 h-px bg-cyan-600"></span>
        </h2>
        <h3 className="text-3xl md:text-5xl font-black text-[#0b3a64] tracking-tight">Cộng đồng & Chia sẻ</h3>
      </div>
      
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {/* Document Download Card */}
        <div className="bg-[#0b3a64] rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group border border-[#0f4b82]">
          {/* Subtle animated background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full transform group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
          
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
            <Download size={160} />
          </div>
          <div className="relative z-10 mb-8">
            <span className="bg-blue-500/30 text-blue-100 border border-blue-500/30 text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase mb-6 inline-block backdrop-blur-md">
              Tài nguyên PDF & Word
            </span>
            <h3 className="text-3xl sm:text-4xl font-black mb-5 leading-tight tracking-tight">Kho Tài Liệu<br/>QLDA & AI Miễn Phí</h3>
            <p className="text-blue-100/80 text-base sm:text-lg leading-relaxed max-w-md">
              Tổng hợp các biểu mẫu quy chuẩn, quy trình chuẩn (SOP), và cẩm nang hướng dẫn ứng dụng Trí tuệ Nhân tạo thực chiến vào quản lý dự án xây dựng.
            </p>
          </div>
          <button 
            onClick={onDownloadClick}
            className="bg-white text-[#0b3a64] font-bold py-4 px-6 sm:px-8 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95 w-fit relative z-10"
          >
            Tải File & Form Mẫu <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Free Courses / Youtube Card */}
        <div className="bg-gradient-to-br from-[#ea4335] to-[#c52b20] rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
          {/* Subtle animated background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 blur-3xl rounded-full transform group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
          
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none">
            <Youtube size={160} />
          </div>
          <div className="relative z-10 mb-8">
            <span className="bg-white/20 text-white border border-white/20 text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase mb-6 inline-flex items-center gap-2 backdrop-blur-md">
              <Youtube size={14} className="text-white group-hover:animate-pulse" /> Video Bài Giảng
            </span>
            <h3 className="text-3xl sm:text-4xl font-black mb-5 leading-tight tracking-tight">Khóa Học AI<br/>Thực Chiến</h3>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-md">
              Series bài giảng video miễn phí kết hợp hướng dẫn thao tác chi tiết từng bước. Học mọi lúc, mọi nơi, trực quan trên kênh YouTube chính thức của tôi.
            </p>
          </div>
          <a 
            href="https://www.youtube.com/@LuatNguyen40" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#c52b20] font-bold py-4 px-6 sm:px-8 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95 w-fit relative z-10"
          >
            Xem trên YouTube <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Zalo Group Card */}
        <div className="bg-gradient-to-br from-[#0068ff] to-[#004bbd] rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-300/20 blur-3xl rounded-full transform group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
          
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none">
            <MessageCircle size={160} />
          </div>
          <div className="relative z-10 mb-8">
            <span className="bg-white/20 text-white border border-white/20 text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase mb-6 inline-flex items-center gap-2 backdrop-blur-md">
              <MessageCircle size={14} className="text-white group-hover:animate-bounce" /> Cộng Đồng Zalo
            </span>
            <h3 className="text-3xl sm:text-4xl font-black mb-5 leading-tight tracking-tight">Cộng Đồng AI<br/>Xây Dựng</h3>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-md">
              Tham gia nhóm Zalo để theo dõi các khóa học miễn phí, cập nhật kiến thức mới nhất và giao lưu cùng các kỹ sư trên toàn quốc.
            </p>
          </div>
          <a 
            href="https://zalo.me/g/tohfjq197" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#0068ff] font-bold py-4 px-6 sm:px-8 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95 w-fit relative z-10"
          >
            Mở trên Zalo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
           <span className="font-bold text-2xl text-[#0b3a64] block mb-6">Nguyễn Văn Luật</span>
           <p className="text-gray-400 max-w-sm leading-relaxed">
             Tiên phong trong việc ứng dụng Trí tuệ nhân tạo vào quản trị dự án kỹ thuật và xây dựng tại Việt Nam.
           </p>
        </div>
        <div>
          <h5 className="font-bold text-[#0b3a64] mb-6 uppercase text-xs tracking-widest">Liên kết</h5>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li><a href="#about" className="hover:text-blue-600">Giới thiệu</a></li>
            <li><a href="#tools" className="hover:text-blue-600">Công cụ AI</a></li>
            <li><a href="#elearning" className="hover:text-blue-600">Khóa học</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[#0b3a64] mb-6 uppercase text-xs tracking-widest">Liên hệ</h5>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li>Email: luatcity86@gmail.com</li>
            <li>Hotline: 0906381186 - 0911605995</li>
            <li>Địa chỉ: TP. Hồ Chí Minh</li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-gray-50 text-gray-400 text-xs font-medium">
        © 2026 Nguyễn Văn Luật. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowAdminAuth(true);
      setAdminPassword('');
      setAdminError(false);
    }
  };

  const verifyAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === '090.6381-186') {
      setIsAdmin(true);
      setShowAdminAuth(false);
    } else {
      setAdminError(true);
    }
  };

  const handleDownload = () => {
    window.open('https://drive.google.com/drive/folders/1cfMsoRnMQWX1z8JIFIiveL5w5PBv0F1g', '_blank');
  };

  const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const navOptions = [
      { label: "Về Coach AI", target: "about", reply: "COACH AI - Nguyễn Văn Luật với hơn 15 năm kinh nghiệm quản lý dự án xây dựng, hiện đang giúp các kỹ sư làm chủ công nghệ AI." },
      { label: "Hệ sinh thái Công cụ AI", target: "tools", reply: "Đây là các công cụ AI được tùy chỉnh riêng cho ngành xây dựng, giúp bạn tự động hóa công việc và tiết kiệm thời gian." },
      { label: "Khóa học thực chiến", target: "elearning", reply: "Các khóa học từ cơ bản đến nâng cao sẽ giúp bạn tự tin ứng dụng AI vào quy trình làm việc thực tế." },
      { label: "Tài nguyên miễn phí", target: "free-resources", reply: "Tại đây bạn có thể tải về các bộ tài liệu chuẩn, biểu mẫu và tham gia chuỗi bài giảng trên YouTube hoàn toàn miễn phí." }
    ];

    const [messages, setMessages] = useState<any[]>([
      { id: 1, text: "Xin chào! Tôi là trợ lý AI. Tôi có thể hướng dẫn bạn khám phá các nội dung trên trang. Bạn đang quan tâm đến phần nào?", isBot: true, options: navOptions }
    ]);
    const [inputValue, setInputValue] = useState("");

    React.useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleOptionSelect = (option: any) => {
      const newMsg = { id: Date.now(), text: option.label, isBot: false };
      setMessages(prev => [...prev, newMsg]);
      
      const element = document.getElementById(option.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          text: option.reply, 
          isBot: true,
          options: navOptions.filter(opt => opt.target !== option.target)
        }]);
      }, 800);
    };

    const handleSend = () => {
      if (!inputValue.trim()) return;
      const newMsg = { id: Date.now(), text: inputValue, isBot: false };
      setMessages([...messages, newMsg]);
      setInputValue("");
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: "Cảm ơn bạn! Để được hỗ trợ chi tiết hơn, bạn có thể liên hệ trực tiếp qua hotline 0906381186.", isBot: true }]);
      }, 1000);
    };

    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-4 sm:right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden flex flex-col h-[500px]"
            >
              <div className="bg-gradient-to-r from-[#0b3a64] to-blue-600 p-4 text-white flex justify-between items-center shadow-md z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <BrainCircuit size={20} className="text-cyan-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Trợ lý AI Hướng dẫn</h4>
                    <p className="text-[10px] text-blue-100 font-medium">Luôn sẵn sàng hỗ trợ</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white p-2 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FBFBFC]">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex flex-col space-y-2">
                    <div className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-[85%] p-3 text-sm shadow-sm leading-relaxed ${msg.isBot ? "bg-white border border-gray-100 text-gray-700 rounded-2xl rounded-tl-sm" : "bg-blue-500 text-white rounded-2xl rounded-tr-sm"}`}>
                        {msg.text}
                      </div>
                    </div>
                    {msg.options && (
                      <div className="flex flex-wrap gap-2 mt-2 justify-start">
                        {msg.options.map((opt: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(opt)}
                            className="text-xs bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors truncate max-w-full font-medium"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <input
                    type="text"
                    placeholder="Nhập câu hỏi của bạn..."
                    className="flex-1 bg-transparent py-2 text-sm focus:outline-none"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button 
                    onClick={handleSend}
                    className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors shrink-0"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-blue-600 transition-all hover:-translate-y-1 active:scale-95`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </>
    );
  };

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      <div className="min-h-screen bg-[#FBFBFC] font-sans selection:bg-blue-100 selection:text-blue-700 block relative overflow-hidden">
        {/* Decorative Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, 50, 0], y: [0, 30, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 50, 0] }} 
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[-5%] w-[25rem] h-[25rem] bg-cyan-200/30 rounded-full blur-3xl"
        />
      </div>

      <Navbar onConsultClick={() => setIsConsultationOpen(true)} />
      <main className="relative z-10">
        <AboutSection 
          onConsultClick={() => setIsConsultationOpen(true)} 
        />
        <ToolAISection onConsultClick={() => setIsConsultationOpen(true)} />
        <ELearningSection onSelectCourse={(course) => setSelectedCourse(course)} />
        <FreeResourcesSection onDownloadClick={handleDownload} />
      </main>
      <Footer />

      {/* Course Player */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseModal 
            course={selectedCourse} 
            onClose={() => setSelectedCourse(null)} 
          />
        )}
      </AnimatePresence>

      {/* Consultation Modal/Chatbox */}
      <AnimatePresence>
        {isConsultationOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConsultationOpen(false)}
              className="absolute inset-0 bg-[#0b3a64]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
            >
              <div className="bg-[#0b3a64] p-8 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <BrainCircuit size={28} className="text-cyan-400" />
                  </div>
                  <button 
                    onClick={() => setIsConsultationOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <h3 className="text-2xl font-bold mb-2">Đăng ký Tư vấn</h3>
                <p className="text-blue-200 text-sm">Vui lòng để lại thông tin, tôi sẽ phản hồi sớm nhất để hỗ trợ giải pháp cho dự án của bạn.</p>
              </div>

              <form className="p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Họ và Tên</label>
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email liên hệ</label>
                  <input 
                    type="email" 
                    placeholder="email@congty.com" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Nhu cầu cụ thể</label>
                  <textarea 
                    rows={3}
                    placeholder="Mô tả ngắn gọn nhu cầu hoặc vấn đề dự án của bạn..." 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                  />
                </div>
                <button 
                  className="w-full bg-[#0b3a64] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-900 transition-all flex items-center justify-center gap-2 mt-4"
                  onClick={() => {
                    alert('Cảm ơn bạn! Thông tin đã được gửi đi.');
                    setIsConsultationOpen(false);
                  }}
                >
                  Gửi yêu cầu tư vấn <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ChatbotWidget />

      {/* Admin Mode Toggle Floating Button */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center bg-white shadow-xl rounded-full p-2 border border-blue-50 cursor-pointer" onClick={handleAdminToggle}>
        <button 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${!isAdmin ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Chế độ xem
        </button>
        <button 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isAdmin ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
        >
          {isAdmin && <Check size={14} />} Quản lý
        </button>
      </div>

      {/* Admin Auth Modal */}
      <AnimatePresence>
        {showAdminAuth && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminAuth(false)}
              className="absolute inset-0 bg-[#0b3a64]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100"
            >
              <div className="bg-[#0b3a64] p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2"><Lock size={20} /> Xác thực Quản lý</h3>
                <button 
                  onClick={() => setShowAdminAuth(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <form onSubmit={verifyAdmin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                    <input 
                      type="password" 
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${adminError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                      placeholder="Nhập mật khẩu..."
                      autoFocus
                    />
                    {adminError && <p className="text-red-500 text-xs mt-2 mt-1">Mật khẩu không chính xác</p>}
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-[#0b3a64] text-white font-bold py-3 rounded-xl hover:bg-blue-900 transition-colors"
                  >
                    Truy cập
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div>
    </AdminContext.Provider>
  );
}
