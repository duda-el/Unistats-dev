import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Major Search, Social & CDN Assets
      { protocol: "https", hostname: "tse1.mm.bing.net" },
      { protocol: "https", hostname: "tse2.mm.bing.net" },
      { protocol: "https", hostname: "tse3.mm.bing.net" },
      { protocol: "https", hostname: "tse4.mm.bing.net" },
      { protocol: "https", hostname: "scontent.ftbs5-2.fna.fbcdn.net" },
      { protocol: "https", hostname: "scontent.ftbs5-4.fna.fbcdn.net" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "www.topuniversities.com" },
      { protocol: "https", hostname: "cdn.freelogovectors.net" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "cdn.gweb.ge" },

      // Georgian Education & University Domains (Combined from all images)
      { protocol: "https", hostname: "alterbridge.edu.ge" },
      { protocol: "https", hostname: "ibsu.edu.ge" },
      { protocol: "https", hostname: "www.tsu.ge" },
      { protocol: "https", hostname: "ug.edu.ge" },
      { protocol: "https", hostname: "abituri.ge" },
      { protocol: "https", hostname: "www.neu.edu.ge" },
      { protocol: "https", hostname: "www.bsu.edu.ge" },
      { protocol: "https", hostname: "tesau.edu.ge" },
      { protocol: "https", hostname: "giu.edu.ge" },
      { protocol: "https", hostname: "www.sou.edu.ge" },
      { protocol: "https", hostname: "sjuni.edu.ge" },
      { protocol: "https", hostname: "eta.edu.ge" },
      { protocol: "https", hostname: "art.edu.ge" },
      { protocol: "https", hostname: "netgazeti.ge" },
      { protocol: "https", hostname: "geomedi.edu.ge" },
      { protocol: "https", hostname: "www.seu.edu.ge" },
      { protocol: "https", hostname: "gu.edu.ge" },
      { protocol: "https", hostname: "tsmu.edu" },
      { protocol: "https", hostname: "admin.ciu.edu.ge" },
      { protocol: "https", hostname: "tsc.edu.ge" },
      { protocol: "https", hostname: "tbeli.ge" },
      { protocol: "https", hostname: "gau.edu.ge" },
      { protocol: "https", hostname: "gruni.edu.ge" },
      { protocol: "https", hostname: "zssu.ge" },
      { protocol: "https", hostname: "alte.edu.ge" },
      { protocol: "https", hostname: "kwiu.edu.ge" },
      { protocol: "https", hostname: "ssu.edu.ge" },
      { protocol: "https", hostname: "btu.edu.ge" },
      { protocol: "https", hostname: "bauinternational.edu.ge" },
      { protocol: "https", hostname: "www.sabauni.edu.ge" },
      { protocol: "https", hostname: "galoba.edu.ge" },
      { protocol: "https", hostname: "dtmu.ge" },
      { protocol: "https", hostname: "agruni.edu.ge" },
      { protocol: "https", hostname: "online.newvision.ge" },
      { protocol: "https", hostname: "forms.tma.edu.ge" },
      { protocol: "https", hostname: "avicenna.edu.ge" },
      { protocol: "https", hostname: "images.unsplash.com" },

      // Non-HTTPS domains
      { protocol: "http", hostname: "gelati.edu.ge" },
    ],
  },
};

export default nextConfig;
