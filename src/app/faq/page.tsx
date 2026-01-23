"use client";

import React, { useState } from "react";
import { 
  Plus, Minus, HelpCircle, GraduationCap, 
  Wallet, Globe2, Briefcase, MessageSquare 
} from "lucide-react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "მიღება და გრანტები",
      icon: <Wallet className="text-blue-500" size={20} />,
      question: "როგორ გამოითვლება სახელმწიფო გრანტის პროცენტული მაჩვენებელი?",
      answer: "სახელმწიფო გრანტი გაიცემა ერთიანი ეროვნული გამოცდების შედეგების საფუძველზე. რეიტინგულ სიაში აბიტურიენტის ადგილი განსაზღვრავს 50%, 70% ან 100%-იანი დაფინანსების მოპოვებას."
    },
    {
      category: "უნივერსიტეტის არჩევა",
      icon: <GraduationCap className="text-purple-500" size={20} />,
      question: "რა კრიტერიუმებით უნდა შევაფასო უნივერსიტეტი?",
      answer: "მნიშვნელოვანია ყურადღება მიაქციოთ დასაქმების მაჩვენებელს, აკადემიური პერსონალის კვალიფიკაციას, გაცვლით პროგრამებს და სტუდენტურ სერვისებს. ჩვენი სტატისტიკა სწორედ ამ მონაცემებს აჯამებს."
    },
    {
      category: "დასაქმება",
      icon: <Briefcase className="text-emerald-500" size={20} />,
      question: "რამდენად ზუსტია თქვენს გვერდზე მოცემული დასაქმების სტატისტიკა?",
      answer: "მონაცემები ეყრდნობა უნივერსიტეტების ყოველწლიურ ანგარიშებს და კურსდამთავრებულთა გამოკითხვებს. ჩვენ პერიოდულად ვაახლებთ ინფორმაციას სანდოობის შესანარჩუნებლად."
    },
    {
      category: "საერთაშორისო პროგრამები",
      icon: <Globe2 className="text-orange-500" size={20} />,
      question: "რომელ უნივერსიტეტებს აქვთ Erasmus+ გაცვლითი პროგრამები?",
      answer: "თითქმის ყველა ავტორიზებულ უნივერსიტეტს აქვს პარტნიორობა ევროპულ სასწავლებლებთან. კონკრეტული სიები შეგიძლიათ იხილოთ თითოეული უნივერსიტეტის დეტალურ გვერდზე."
    },
    {
      category: "პლატფორმის შესახებ",
      icon: <MessageSquare className="text-pink-500" size={20} />,
      question: "უფასოა თუ არა UNISTATS-ის გამოყენება?",
      answer: "დიახ, ჩვენი პლატფორმა სრულიად უფასოა აბიტურიენტებისთვის და სტუდენტებისთვის. ჩვენი მიზანია საჯარო მონაცემების ხელმისაწვდომობის გაზრდა."
    }
  ];

  return (
    <div className="max-w-[900px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      
      {/* 📝 Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mx-auto">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-4xl font-black text-[#1B2559]">ხშირად დასმული კითხვები</h1>
        <p className="text-slate-400 font-medium">გაქვს კითხვა? ჩვენ აქ ვართ დასახმარებლად.</p>
      </div>

      {/* 💡 FAQ Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className={`bg-white rounded-[30px] border transition-all duration-300 ${
              openIndex === index ? 'border-blue-200 shadow-xl shadow-blue-500/5' : 'border-gray-50'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 md:p-8 flex items-center justify-between text-left outline-none"
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 group-hover:bg-white transition-colors`}>
                  {faq.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">
                    {faq.category}
                  </span>
                  <h3 className={`text-base md:text-lg font-bold transition-colors ${
                    openIndex === index ? 'text-blue-600' : 'text-[#1B2559]'
                  }`}>
                    {faq.question}
                  </h3>
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                openIndex === index ? 'bg-blue-600 text-white rotate-0' : 'bg-slate-100 text-slate-400 rotate-180'
              }`}>
                {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-8 pt-0 ml-16 md:ml-20">
                <div className="h-[1px] bg-slate-50 mb-6" />
                <p className="text-slate-500 font-medium leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📧 Support Box */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-10 text-center text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
        <h3 className="text-2xl font-black mb-2">ვერ იპოვე პასუხი?</h3>
        <p className="text-blue-100 mb-8 opacity-80">მოგვწერე ნებისმიერ დროს და ჩვენი გუნდი მალე გიპასუხებს.</p>
        <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-xl hover:scale-105 transition-all">
          დასვი კითხვა
        </button>
      </div>
    </div>
  );
};

export default FAQPage;