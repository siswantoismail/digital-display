import React from 'react';

export function KGTKEmblem({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="emblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="emblemTeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>
      {/* Outer shield */}
      <path
        d="M60 6L98 22V58C98 84 60 110 60 110C60 110 22 84 22 58V22L60 6Z"
        fill="#047857"
        stroke="url(#emblemGold)"
        strokeWidth="3.5"
      />
      {/* Inner crest */}
      <path
        d="M60 14L90 27V56C90 77 60 98 60 98C60 98 30 77 30 56V27L60 14Z"
        fill="#064E3B"
      />
      {/* Gorontalo Crown (Makuta Hulonthalo) top */}
      <path
        d="M48 38L52 30L60 35L68 30L72 38H48Z"
        fill="url(#emblemGold)"
      />
      <circle cx="52" cy="28" r="1.5" fill="#FEF08A" />
      <circle cx="60" cy="25" r="2" fill="#FEF08A" />
      <circle cx="68" cy="28" r="1.5" fill="#FEF08A" />
      {/* Open Book of Knowledge */}
      <path
        d="M60 52C53 48 40 48 38 51V73C45 70 54 70 60 74C66 70 75 70 82 73V51C80 48 67 48 60 52Z"
        fill="#F8FAFC"
        stroke="url(#emblemGold)"
        strokeWidth="2"
      />
      <path d="M60 52V74" stroke="#047857" strokeWidth="2" />
      {/* Torch of Enlightenment */}
      <path
        d="M60 40C62.5 44 65 47 62 50C59 53 58 48 60 40Z"
        fill="#EF4444"
      />
      <path
        d="M60 42C61 44 62 46 61 48C59.5 49.5 59 46.5 60 42Z"
        fill="#FBBF24"
      />
      <path d="M57 50H63L61 58H59L57 50Z" fill="url(#emblemGold)" />
      {/* 5 Stars of Pancasila & Integrity */}
      <circle cx="43" cy="80" r="1.8" fill="#FBBF24" />
      <circle cx="51" cy="84" r="2.2" fill="#FBBF24" />
      <circle cx="60" cy="86" r="2.8" fill="#FBBF24" />
      <circle cx="69" cy="84" r="2.2" fill="#FBBF24" />
      <circle cx="77" cy="80" r="1.8" fill="#FBBF24" />
    </svg>
  );
}

export function KasubiIllustration({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bananaLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#15803D" />
          <stop offset="50%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>
        <radialGradient id="cassavaTexture" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="70%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#EAB308" />
        </radialGradient>
      </defs>
      {/* Table Surface */}
      <rect width="400" height="240" fill="#1E293B" />
      {/* Banana Leaf Platter */}
      <path
        d="M30 140C60 70 200 65 370 110C360 185 240 215 30 140Z"
        fill="url(#bananaLeaf)"
      />
      <path
        d="M50 135C150 115 280 120 350 115"
        stroke="#4ADE80"
        strokeWidth="2.5"
        strokeDasharray="4 6"
        opacity="0.6"
      />
      {/* Kasubi (Ubi Kayu / Singkong Rebus) Chunks */}
      <g>
        {/* Piece 1 */}
        <ellipse cx="140" cy="135" rx="38" ry="24" fill="url(#cassavaTexture)" />
        <ellipse cx="138" cy="130" rx="32" ry="18" fill="#FEFCE8" />
        <path d="M120 130C130 135 150 128 156 133" stroke="#CA8A04" strokeWidth="1.5" opacity="0.4" />
        {/* Piece 2 */}
        <ellipse cx="205" cy="142" rx="44" ry="26" fill="url(#cassavaTexture)" />
        <ellipse cx="202" cy="137" rx="37" ry="20" fill="#FFFFF0" />
        <path d="M185 137C198 142 220 135 228 140" stroke="#CA8A04" strokeWidth="1.5" opacity="0.4" />
        {/* Piece 3 */}
        <ellipse cx="265" cy="130" rx="36" ry="22" fill="url(#cassavaTexture)" />
        <ellipse cx="262" cy="126" rx="30" ry="16" fill="#FEF9C3" />
      </g>
      {/* Fresh Grated Coconut Flakes (Parutan Kelapa Segar) */}
      <g fill="#FFFFFF" opacity="0.95">
        <ellipse cx="190" cy="126" rx="14" ry="7" />
        <ellipse cx="225" cy="132" rx="12" ry="6" />
        <ellipse cx="150" cy="128" rx="10" ry="5" />
        <circle cx="170" cy="120" r="2" />
        <circle cx="178" cy="124" r="2.5" />
        <circle cx="210" cy="122" r="3" />
        <circle cx="240" cy="126" r="2.5" />
        <circle cx="135" cy="122" r="2" />
      </g>
      {/* Sambal Dabu-Dabu Roa Bowl */}
      <g>
        <ellipse cx="95" cy="165" rx="30" ry="16" fill="#334155" />
        <ellipse cx="95" cy="163" rx="26" ry="13" fill="#DC2626" />
        {/* Chili seeds & shallots */}
        <circle cx="90" cy="161" r="2.5" fill="#FEF08A" />
        <circle cx="102" cy="164" r="3" fill="#FEF08A" />
        <circle cx="96" cy="166" r="2.5" fill="#F87171" />
        <ellipse cx="88" cy="164" rx="4" ry="2" fill="#E2E8F0" />
        <ellipse cx="104" cy="160" rx="4" ry="2" fill="#E2E8F0" />
      </g>
      {/* Hot Kopi Pinogu Cup */}
      <g>
        <ellipse cx="320" cy="168" rx="22" ry="10" fill="#0F172A" opacity="0.6" />
        <rect x="302" y="125" width="36" height="38" rx="4" fill="#E2E8F0" />
        <ellipse cx="320" cy="125" rx="18" ry="7" fill="#451A03" />
        {/* Cup handle */}
        <path d="M338 132C346 132 348 148 338 152" stroke="#CBD5E1" strokeWidth="4" fill="none" />
        {/* Steam */}
        <path d="M314 116C312 110 318 104 316 98" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M324 114C322 107 328 102 326 95" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  );
}

export function AvatarTeacherMale({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="avatarBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#082F49" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="16" fill="url(#avatarBg)" />
      {/* Shoulders / Formal Batik Kemeja */}
      <path
        d="M25 200C25 155 55 142 100 142C145 142 175 155 175 200H25Z"
        fill="#0F172A"
      />
      {/* Batik Motif on Shirt */}
      <path
        d="M80 152L100 168L120 152L100 185L80 152Z"
        fill="#D97706"
        opacity="0.8"
      />
      <circle cx="65" cy="175" r="8" fill="#F59E0B" opacity="0.6" />
      <circle cx="135" cy="175" r="8" fill="#F59E0B" opacity="0.6" />
      <path d="M100 168V200" stroke="#FBBF24" strokeWidth="2.5" />
      {/* Neck */}
      <rect x="88" y="118" width="24" height="28" rx="6" fill="#FBBF24" />
      {/* Head */}
      <ellipse cx="100" cy="92" rx="35" ry="42" fill="#FDE68A" />
      {/* Hair */}
      <path
        d="M65 88C64 62 82 52 100 52C118 52 136 62 135 88C132 82 120 68 100 68C80 68 68 82 65 88Z"
        fill="#1E293B"
      />
      {/* Glasses */}
      <rect x="74" y="85" width="22" height="15" rx="4" stroke="#0F172A" strokeWidth="2.5" fill="none" />
      <rect x="104" y="85" width="22" height="15" rx="4" stroke="#0F172A" strokeWidth="2.5" fill="none" />
      <path d="M96 92H104" stroke="#0F172A" strokeWidth="2.5" />
      {/* Eyes */}
      <circle cx="85" cy="92" r="2.5" fill="#0F172A" />
      <circle cx="115" cy="92" r="2.5" fill="#0F172A" />
      {/* Smile */}
      <path
        d="M88 114C94 120 106 120 112 114"
        stroke="#78350F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* ASN Badge Pin on Chest */}
      <rect x="52" y="165" width="16" height="8" rx="2" fill="#F59E0B" />
      <circle cx="60" cy="169" r="2" fill="#FFFFFF" />
    </svg>
  );
}

export function AvatarTeacherFemale({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="avatarBgFem" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064E3B" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="16" fill="url(#avatarBgFem)" />
      {/* Hijab / Veil Shape */}
      <path
        d="M40 200C40 148 55 110 100 110C145 110 160 148 160 200H40Z"
        fill="#1E3A8A"
      />
      <path
        d="M60 102C58 70 76 50 100 50C124 50 142 70 140 102C140 135 125 152 100 152C75 152 60 135 60 102Z"
        fill="#2563EB"
      />
      {/* Face oval inside hijab */}
      <ellipse cx="100" cy="98" rx="27" ry="33" fill="#FDE68A" />
      {/* Eyes with gentle eyelashes */}
      <ellipse cx="88" cy="96" rx="3" ry="2" fill="#0F172A" />
      <ellipse cx="112" cy="96" rx="3" ry="2" fill="#0F172A" />
      <path d="M84 92C87 89 91 89 94 92" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M106 92C109 89 113 89 116 92" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Smile */}
      <path
        d="M91 116C96 121 104 121 109 116"
        stroke="#991B1B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Official Pin / Brooch */}
      <circle cx="100" cy="155" r="5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
    </svg>
  );
}
