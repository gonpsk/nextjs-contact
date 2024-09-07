"use client";
import React, { useContext } from "react";
import { ProfileContext } from "../profilecontxt";

function Page() {
  const { language } = useContext(ProfileContext); // ดึงข้อมูลภาษา

  return (
    <div className="flex flex-col flex-1">
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto text-center">
          {language === "EN" ? (
            <>
              <div className="mb-4">
                <p>Suwingthawong Nongchok, Bangkok, Thailand</p>
              </div>

              <div className="mb-4">
                <a
                  href="tel:+66987654321"
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  Phone: +66 987-654-321
                </a>
              </div>

              <div className="mb-4">
                <a
                  href="mailto:patsakorn.gon@gmail.com"
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  Email: patsakorn.gon@gmail.com
                </a>
              </div>

              <div>
                <a
                  href="https://line.me/R/ti/p/@examplelineid"
                  target="_blank"
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  Contact via Line
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <p>สุวินทวงศ์ หนองจอก, กรุงเทพฯ, ประเทศไทย</p>
              </div>

              <div className="mb-4">
                <a
                  href="tel:+66987654321"
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  เบอร์โทร: +66 987-654-321
                </a>
              </div>

              <div className="mb-4">
                <a
                  href="mailto:patsakorn.gon@gmail.com"
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  ส่งอีเมล: patsakorn.gon@gmail.com
                </a>
              </div>

              <div>
                <a
                  href="https://line.me/R/ti/p/@examplelineid"
                  target="_blank"
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  ติดต่อผ่าน Line
                </a>
              </div>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}

export default Page;
