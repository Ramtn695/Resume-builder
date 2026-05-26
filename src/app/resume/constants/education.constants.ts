export const CATEGORY = ['Fresher', 'Experienced'] as const;

export interface CountryEducationConfig {
  country: string;
  isoCode: string;
  levels: string[];
  normalizer: Record<string, 'UNDERGRADUATE' | 'POSTGRADUATE' | 'DOCTORATE' | 'SCHOOLING' | 'VOCATIONAL'>;
}

export const GLOBAL_EDUCATION_REGISTRY: CountryEducationConfig[] = [
  {
    country: 'Global / Standard Fallback',
    isoCode: 'DEFAULT',
    levels: ['Primary Education', 'Secondary / High School', 'Vocational / Technical', 'Diploma / Associate Degree', 'Bachelor / Undergraduate', 'Master / Postgraduate', 'Doctorate / PhD', 'Others'],
    normalizer: {
      'Bachelor / Undergraduate': 'UNDERGRADUATE',
      'Master / Postgraduate': 'POSTGRADUATE',
      'Doctorate / PhD': 'DOCTORATE',
      'Secondary / High School': 'SCHOOLING',
      'Vocational / Technical': 'VOCATIONAL',
      'Diploma / Associate Degree': 'VOCATIONAL'
    }
  },
  {
    country: 'Argentina',
    isoCode: 'AR',
    levels: ['Título Secundario', 'Pregrado (Técnico)', 'Grado (Licenciatura / Ingeniería)', 'Maestría / Especialización', 'Doctorado', 'Others'],
    normalizer: { 'Grado (Licenciatura / Ingeniería)': 'UNDERGRADUATE', 'Maestría / Especialización': 'POSTGRADUATE', 'Doctorado': 'DOCTORATE', 'Título Secundario': 'SCHOOLING', 'Pregrado (Técnico)': 'VOCATIONAL' }
  },
  {
    country: 'Australia',
    isoCode: 'AU',
    levels: ['Senior Secondary Certificate (VCE/HSC)', 'AQF Certificate III/IV', 'Diploma / Advanced Diploma', 'Bachelor Degree', 'Bachelor Honours Degree', 'Graduate Certificate/Diploma', 'Master\'s Degree', 'Doctoral Degree (PhD)', 'Others'],
    normalizer: { 'Bachelor Degree': 'UNDERGRADUATE', 'Bachelor Honours Degree': 'UNDERGRADUATE', 'Graduate Certificate/Diploma': 'POSTGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctoral Degree (PhD)': 'DOCTORATE', 'Senior Secondary Certificate (VCE/HSC)': 'SCHOOLING', 'AQF Certificate III/IV': 'VOCATIONAL', 'Diploma / Advanced Diploma': 'VOCATIONAL' }
  },
  {
    country: 'Austria',
    isoCode: 'AT',
    levels: ['Matura / Reifezeugnis', 'Fachhochschul-Bachelor', 'Fachhochschul-Master', 'Doktoratstudium', 'Others'],
    normalizer: { 'Fachhochschul-Bachelor': 'UNDERGRADUATE', 'Fachhochschul-Master': 'POSTGRADUATE', 'Doktoratstudium': 'DOCTORATE', 'Matura / Reifezeugnis': 'SCHOOLING' }
  },
  {
    country: 'Bangladesh',
    isoCode: 'BD',
    levels: ['SSC / Dakhil', 'HSC / Alim', 'Diploma in Engineering', 'Bachelor Degree (Pass/Honours)', 'Master\'s Degree', 'PhD', 'Others'],
    normalizer: { 'Bachelor Degree (Pass/Honours)': 'UNDERGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'PhD': 'DOCTORATE', 'SSC / Dakhil': 'SCHOOLING', 'HSC / Alim': 'SCHOOLING', 'Diploma in Engineering': 'VOCATIONAL' }
  },
  {
    country: 'Belgium',
    isoCode: 'BE',
    levels: ['Secundair Onderwijs', 'Graduaat', 'Bachelor', 'Master', 'Doctoraat', 'Others'],
    normalizer: { 'Bachelor': 'UNDERGRADUATE', 'Master': 'POSTGRADUATE', 'Doctoraat': 'DOCTORATE', 'Secundair Onderwijs': 'SCHOOLING', 'Graduaat': 'VOCATIONAL' }
  },
  {
    country: 'Brazil',
    isoCode: 'BR',
    levels: ['Ensino Médio', 'Tecnólogo', 'Bacharelado / Licenciatura', 'Mestrado', 'Doutorado', 'Others'],
    normalizer: { 'Bacharelado / Licenciatura': 'UNDERGRADUATE', 'Mestrado': 'POSTGRADUATE', 'Doutorado': 'DOCTORATE', 'Ensino Médio': 'SCHOOLING', 'Tecnólogo': 'VOCATIONAL' }
  },
  {
    country: 'Canada',
    isoCode: 'CA',
    levels: ['High School Diploma', 'AEC / DEP (Vocational)', 'College Diploma (DEC)', 'Bachelor\'s Degree', 'Post-Graduate Certificate/Diploma', 'Master\'s Degree', 'Doctorate (PhD)', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Post-Graduate Certificate/Diploma': 'POSTGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctorate (PhD)': 'DOCTORATE', 'High School Diploma': 'SCHOOLING', 'AEC / DEP (Vocational)': 'VOCATIONAL', 'College Diploma (DEC)': 'VOCATIONAL' }
  },
  {
    country: 'Chile',
    isoCode: 'CL',
    levels: ['Licencia de Educación Media', 'Título Técnico de Nivel Superior', 'Título Profesional / Licenciatura', 'Magíster', 'Doctorado', 'Others'],
    normalizer: { 'Título Profesional / Licenciatura': 'UNDERGRADUATE', 'Magíster': 'POSTGRADUATE', 'Doctorado': 'DOCTORATE', 'Licencia de Educación Media': 'SCHOOLING', 'Título Técnico de Nivel Superior': 'VOCATIONAL' }
  },
  {
    country: 'China',
    isoCode: 'CN',
    levels: ['High School Graduation Certificate', 'Zhuanke (Associate / Junior College)', 'Benke (Bachelor\'s Degree)', 'Shuoshi (Master\'s Degree)', 'Boshi (Doctoral Degree)', 'Others'],
    normalizer: { 'Benke (Bachelor\'s Degree)': 'UNDERGRADUATE', 'Shuoshi (Master\'s Degree)': 'POSTGRADUATE', 'Boshi (Doctoral Degree)': 'DOCTORATE', 'High School Graduation Certificate': 'SCHOOLING', 'Zhuanke (Associate / Junior College)': 'VOCATIONAL' }
  },
  {
    country: 'Colombia',
    isoCode: 'CO',
    levels: ['Bachiller', 'Técnico Profesional / Tecnológico', 'Pregrado (Licenciatura / Profesional)', 'Maestría / Especialización', 'Doctorado', 'Others'],
    normalizer: { 'Pregrado (Licenciatura / Profesional)': 'UNDERGRADUATE', 'Maestría / Especialización': 'POSTGRADUATE', 'Doctorado': 'DOCTORATE', 'Bachiller': 'SCHOOLING', 'Técnico Profesional / Tecnológico': 'VOCATIONAL' }
  },
  {
    country: 'Denmark',
    isoCode: 'DK',
    levels: ['Studentereksamen (STX/HHX)', 'Erhvervsakademiuddannelse (Academy Profession)', 'Professionsbachelor / Bachelor', 'Kandidat (Master)', 'Ph.d.-grad', 'Others'],
    normalizer: { 'Professionsbachelor / Bachelor': 'UNDERGRADUATE', 'Kandidat (Master)': 'POSTGRADUATE', 'Ph.d.-grad': 'DOCTORATE', 'Studentereksamen (STX/HHX)': 'SCHOOLING', 'Erhvervsakademiuddannelse (Academy Profession)': 'VOCATIONAL' }
  },
  {
    country: 'Egypt',
    isoCode: 'EG',
    levels: ['General Secondary Education Certificate', 'Technical Institute Diploma', 'Bachelor\'s Degree', 'Postgraduate Diploma', 'Master\'s Degree', 'Doctoral Degree', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Postgraduate Diploma': 'POSTGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctoral Degree': 'DOCTORATE', 'General Secondary Education Certificate': 'SCHOOLING', 'Technical Institute Diploma': 'VOCATIONAL' }
  },
  {
    country: 'Finland',
    isoCode: 'FI',
    levels: ['Ylioppilastutkinto / Matriculation', 'Ammattikorkeakoulututkinto (AMK Bachelor)', 'Ylempi AMK / Maisteri (Master)', 'Tohtori (Doctorate)', 'Others'],
    normalizer: { 'Ammattikorkeakoulututkinto (AMK Bachelor)': 'UNDERGRADUATE', 'Ylempi AMK / Maisteri (Master)': 'POSTGRADUATE', 'Tohtori (Doctorate)': 'DOCTORATE', 'Ylioppilastutkinto / Matriculation': 'SCHOOLING' }
  },
  {
    country: 'France',
    isoCode: 'FR',
    levels: ['Baccalauréat', 'BTS / DUT / BUT', 'Licence (Bac+3)', 'Master (Bac+5)', 'Doctorat (Bac+8)', 'Others'],
    normalizer: { 'Licence (Bac+3)': 'UNDERGRADUATE', 'Master (Bac+5)': 'POSTGRADUATE', 'Doctorat (Bac+8)': 'DOCTORATE', 'Baccalauréat': 'SCHOOLING', 'BTS / DUT / BUT': 'VOCATIONAL' }
  },
  {
    country: 'Germany',
    isoCode: 'DE',
    levels: ['Abitur / Fachhochschulreife', 'Berufsausbildung (Vocational)', 'Bachelor (University / Fachhochschule)', 'Master', 'Promotionsstudium / Doktorat', 'Others'],
    normalizer: { 'Bachelor (University / Fachhochschule)': 'UNDERGRADUATE', 'Master': 'POSTGRADUATE', 'Promotionsstudium / Doktorat': 'DOCTORATE', 'Abitur / Fachhochschulreife': 'SCHOOLING', 'Berufsausbildung (Vocational)': 'VOCATIONAL' }
  },
  {
    country: 'Ghana',
    isoCode: 'GH',
    levels: ['WASSCE', 'Higher National Diploma (HND)', 'Bachelor\'s Degree', 'Postgraduate Diploma', 'Master\'s Degree (MPhil/MSc)', 'PhD / Doctorate', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Higher National Diploma (HND)': 'UNDERGRADUATE', 'Postgraduate Diploma': 'POSTGRADUATE', 'Master\'s Degree (MPhil/MSc)': 'POSTGRADUATE', 'PhD / Doctorate': 'DOCTORATE', 'WASSCE': 'SCHOOLING' }
  },
  {
    country: 'Greece',
    isoCode: 'GR',
    levels: ['Apolytirio Lykeiou', 'Advanced Diploma (IEK)', 'Ptychio (Bachelor)', 'Metaptychialo (Master)', 'Didaktoriko (PhD)', 'Others'],
    normalizer: { 'Ptychio (Bachelor)': 'UNDERGRADUATE', 'Metaptychialo (Master)': 'POSTGRADUATE', 'Didaktoriko (PhD)': 'DOCTORATE', 'Apolytirio Lykeiou': 'SCHOOLING', 'Advanced Diploma (IEK)': 'VOCATIONAL' }
  },
  {
    country: 'Hong Kong',
    isoCode: 'HK',
    levels: ['HKDSE / HKALE', 'Associate Degree / Higher Diploma', 'Bachelor\'s Degree', 'Master\'s Degree (Taught/Research)', 'MPhil / PhD', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Master\'s Degree (Taught/Research)': 'POSTGRADUATE', 'MPhil / PhD': 'DOCTORATE', 'HKDSE / HKALE': 'SCHOOLING', 'Associate Degree / Higher Diploma': 'VOCATIONAL' }
  },
  {
    country: 'India',
    isoCode: 'IN',
    levels: ['ITI', 'SSLC / 10th', 'Diploma', 'HSC / 12TH', 'U.G.', 'P.G.', 'Doctorate', 'Others'],
    normalizer: { 'U.G.': 'UNDERGRADUATE', 'P.G.': 'POSTGRADUATE', 'Doctorate': 'DOCTORATE', 'SSLC / 10th': 'SCHOOLING', 'HSC / 12TH': 'SCHOOLING', 'ITI': 'VOCATIONAL', 'Diploma': 'VOCATIONAL' }
  },
  {
    country: 'Indonesia',
    isoCode: 'ID',
    levels: ['SMA / SMK / MA (High School)', 'Diploma I/II/III/IV', 'Sarjana 1 (S1 - Bachelor)', 'Sarjana 2 (S2 - Master)', 'Sarjana 3 (S3 - Doctorate)', 'Others'],
    normalizer: { 'Sarjana 1 (S1 - Bachelor)': 'UNDERGRADUATE', 'Sarjana 2 (S2 - Master)': 'POSTGRADUATE', 'Sarjana 3 (S3 - Doctorate)': 'DOCTORATE', 'SMA / SMK / MA (High School)': 'SCHOOLING', 'Diploma I/II/III/IV': 'VOCATIONAL' }
  },
  {
    country: 'Ireland',
    isoCode: 'IE',
    levels: ['Leaving Certificate', 'NFQ Level 6 (Advanced Certificate)', 'NFQ Level 7/8 (Bachelor Degree)', 'NFQ Level 9 (Master / PG Dip)', 'NFQ Level 10 (Doctorate)', 'Others'],
    normalizer: { 'NFQ Level 7/8 (Bachelor Degree)': 'UNDERGRADUATE', 'NFQ Level 9 (Master / PG Dip)': 'POSTGRADUATE', 'NFQ Level 10 (Doctorate)': 'DOCTORATE', 'Leaving Certificate': 'SCHOOLING', 'NFQ Level 6 (Advanced Certificate)': 'VOCATIONAL' }
  },
  {
    country: 'Israel',
    isoCode: 'IL',
    levels: ['Bagrut (Matriculation Certificate)', 'Practical Engineer Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate (PhD)', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctorate (PhD)': 'DOCTORATE', 'Bagrut (Matriculation Certificate)': 'SCHOOLING', 'Practical Engineer Diploma': 'VOCATIONAL' }
  },
  {
    country: 'Italy',
    isoCode: 'IT',
    levels: ['Diploma di Maturità', 'Laurea Triennale (Bachelor)', 'Laurea Magistrale (Master)', 'Dottorato di Ricerca (PhD)', 'Others'],
    normalizer: { 'Laurea Triennale (Bachelor)': 'UNDERGRADUATE', 'Laurea Magistrale (Master)': 'POSTGRADUATE', 'Dottorato di Ricerca (PhD)': 'DOCTORATE', 'Diploma di Maturità': 'SCHOOLING' }
  },
  {
    country: 'Japan',
    isoCode: 'JP',
    levels: ['High School Diploma', 'Associate Degree (Junior College)', 'Advanced Diploma (Specialized College)', 'Gakushi (Bachelor\'s)', 'Shushi (Master\'s)', 'Hakushi (Doctorate)', 'Others'],
    normalizer: { 'Gakushi (Bachelor\'s)': 'UNDERGRADUATE', 'Shushi (Master\'s)': 'POSTGRADUATE', 'Hakushi (Doctorate)': 'DOCTORATE', 'High School Diploma': 'SCHOOLING', 'Associate Degree (Junior College)': 'VOCATIONAL', 'Advanced Diploma (Specialized College)': 'VOCATIONAL' }
  },
  {
    country: 'Kenya',
    isoCode: 'KE',
    levels: ['KCSE (Secondary Ed)', 'College Certificate / Diploma', 'Bachelor\'s Degree', 'Postgraduate Diploma', 'Master\'s Degree', 'Doctoral Degree (PhD)', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Postgraduate Diploma': 'POSTGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctoral Degree (PhD)': 'DOCTORATE', 'KCSE (Secondary Ed)': 'SCHOOLING', 'College Certificate / Diploma': 'VOCATIONAL' }
  },
  {
    country: 'Malaysia',
    isoCode: 'MY',
    levels: ['SPM', 'STPM / Matriculation / Foundation', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate (PhD)', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctorate (PhD)': 'DOCTORATE', 'SPM': 'SCHOOLING', 'STPM / Matriculation / Foundation': 'SCHOOLING', 'Diploma': 'VOCATIONAL' }
  },
  {
    country: 'Mexico',
    isoCode: 'MX',
    levels: ['Bachillerato', 'Técnico Superior Universitario', 'Licenciatura / Ingeniería', 'Maestría', 'Doctorado', 'Others'],
    normalizer: { 'Licenciatura / Ingeniería': 'UNDERGRADUATE', 'Maestría': 'POSTGRADUATE', 'Doctorado': 'DOCTORATE', 'Bachillerato': 'SCHOOLING', 'Técnico Superior Universitario': 'VOCATIONAL' }
  },
  {
    country: 'Netherlands',
    isoCode: 'NL',
    levels: ['VWO / HAVO / MBO', 'Associate Degree', 'HBO / WO Bachelor', 'HBO / WO Master', 'Doctoraat (PhD)', 'Others'],
    normalizer: { 'HBO / WO Bachelor': 'UNDERGRADUATE', 'HBO / WO Master': 'POSTGRADUATE', 'Doctoraat (PhD)': 'DOCTORATE', 'VWO / HAVO / MBO': 'SCHOOLING', 'Associate Degree': 'VOCATIONAL' }
  },
  {
    country: 'New Zealand',
    isoCode: 'NZ',
    levels: ['NCEA Level 3', 'NZQF Diploma (Level 5-6)', 'Bachelor\'s Degree (Level 7)', 'Postgraduate Diploma (Level 8)', 'Master\'s Degree (Level 9)', 'Doctoral Degree (Level 10)', 'Others'],
    normalizer: { 'Bachelor\'s Degree (Level 7)': 'UNDERGRADUATE', 'Postgraduate Diploma (Level 8)': 'POSTGRADUATE', 'Master\'s Degree (Level 9)': 'POSTGRADUATE', 'Doctoral Degree (Level 10)': 'DOCTORATE', 'NCEA Level 3': 'SCHOOLING', 'NZQF Diploma (Level 5-6)': 'VOCATIONAL' }
  },
  {
    country: 'Nigeria',
    isoCode: 'NG',
    levels: ['WASSCE / NECO (SSCE)', 'National Diploma (ND)', 'Higher National Diploma (HND) / Bachelor\'s', 'Postgraduate Diploma (PGD)', 'Master\'s Degree', 'Doctorate (PhD)', 'Others'],
    normalizer: { 'Higher National Diploma (HND) / Bachelor\'s': 'UNDERGRADUATE', 'Postgraduate Diploma (PGD)': 'POSTGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctorate (PhD)': 'DOCTORATE', 'WASSCE / NECO (SSCE)': 'SCHOOLING', 'National Diploma (ND)': 'VOCATIONAL' }
  },
  {
    country: 'Norway',
    isoCode: 'NO',
    levels: ['Vitnemål (Upper Secondary)', 'Høgskolekandidat', 'Bachelorgrad', 'Mastergrad', 'Ph.d. / Doktorgrad', 'Others'],
    normalizer: { 'Bachelorgrad': 'UNDERGRADUATE', 'Mastergrad': 'POSTGRADUATE', 'Ph.d. / Doktorgrad': 'DOCTORATE', 'Vitnemål (Upper Secondary)': 'SCHOOLING', 'Høgskolekandidat': 'VOCATIONAL' }
  },
  {
    country: 'Pakistan',
    isoCode: 'PK',
    levels: ['Matriculation / SSC', 'Intermediate / HSSC', 'Bachelor (2/3 Year)', 'Bachelor (4 Year Hons)', 'Master / MPhil', 'PhD', 'Others'],
    normalizer: { 'Bachelor (2/3 Year)': 'UNDERGRADUATE', 'Bachelor (4 Year Hons)': 'UNDERGRADUATE', 'Master / MPhil': 'POSTGRADUATE', 'PhD': 'DOCTORATE', 'Matriculation / SSC': 'SCHOOLING', 'Intermediate / HSSC': 'SCHOOLING' }
  },
  {
    country: 'Philippines',
    isoCode: 'PH',
    levels: ['High School Diploma (K-12)', 'Associate Degree / Certificate', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate / PhD', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctorate / PhD': 'DOCTORATE', 'High School Diploma (K-12)': 'SCHOOLING', 'Associate Degree / Certificate': 'VOCATIONAL' }
  },
  {
    country: 'Poland',
    isoCode: 'PL',
    levels: ['Matura / Świadectwo Dojrzałości', 'Licencjat / Inżynier (Bachelor)', 'Magister (Master)', 'Doktor (PhD)', 'Others'],
    normalizer: { 'Licencjat / Inżynier (Bachelor)': 'UNDERGRADUATE', 'Magister (Master)': 'POSTGRADUATE', 'Doktor (PhD)': 'DOCTORATE', 'Matura / Świadectwo Dojrzałości': 'SCHOOLING' }
  },
  {
    country: 'Portugal',
    isoCode: 'PT',
    levels: ['Diploma de Ensino Secundário', 'Curso Técnico Superior Profesional', 'Licenciatura', 'Mestrado', 'Doutoramento', 'Others'],
    normalizer: { 'Licenciatura': 'UNDERGRADUATE', 'Mestrado': 'POSTGRADUATE', 'Doutoramento': 'DOCTORATE', 'Diploma de Ensino Secundário': 'SCHOOLING', 'Curso Técnico Superior Profesional': 'VOCATIONAL' }
  },
  {
    country: 'Saudi Arabia',
    isoCode: 'SA',
    levels: ['High School Certificate', 'Associate Diploma', 'Bachelor\'s Degree', 'Higher Diploma', 'Master\'s Degree', 'Doctorate (PhD)', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Higher Diploma': 'POSTGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctorate (PhD)': 'DOCTORATE', 'High School Certificate': 'SCHOOLING', 'Associate Diploma': 'VOCATIONAL' }
  },
  {
    country: 'Singapore',
    isoCode: 'SG',
    levels: ['GCE O-Level / N-Level', 'GCE A-Level', 'NITEC / Higher NITEC', 'Polytechnic Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate (PhD)', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctorate (PhD)': 'DOCTORATE', 'GCE O-Level / N-Level': 'SCHOOLING', 'GCE A-Level': 'SCHOOLING', 'NITEC / Higher NITEC': 'VOCATIONAL', 'Polytechnic Diploma': 'VOCATIONAL' }
  },
  {
    country: 'South Africa',
    isoCode: 'ZA',
    levels: ['National Senior Certificate (Matric / NSC)', 'National Diploma (NQF 6)', 'Advanced Diploma / Bachelor\'s Degree (NQF 7)', 'Honours Degree / PG Dip (NQF 8)', 'Master\'s Degree (NQF 9)', 'Doctoral Degree (NQF 10)', 'Others'],
    normalizer: { 'Advanced Diploma / Bachelor\'s Degree (NQF 7)': 'UNDERGRADUATE', 'Honours Degree / PG Dip (NQF 8)': 'POSTGRADUATE', 'Master\'s Degree (NQF 9)': 'POSTGRADUATE', 'Doctoral Degree (NQF 10)': 'DOCTORATE', 'National Senior Certificate (Matric / NSC)': 'SCHOOLING', 'National Diploma (NQF 6)': 'VOCATIONAL' }
  },
  {
    country: 'South Korea',
    isoCode: 'KR',
    levels: ['High School Diploma', 'Professional Associate Degree', 'Haksa (Bachelor\'s Degree)', 'Suksa (Master\'s Degree)', 'Paksa (Doctoral Degree)', 'Others'],
    normalizer: { 'Haksa (Bachelor\'s Degree)': 'UNDERGRADUATE', 'Suksa (Master\'s Degree)': 'POSTGRADUATE', 'Paksa (Doctoral Degree)': 'DOCTORATE', 'High School Diploma': 'SCHOOLING', 'Professional Associate Degree': 'VOCATIONAL' }
  },
  {
    country: 'Spain',
    isoCode: 'ES',
    levels: ['Bachillerato', 'Ciclo Formativo de Grado Superior', 'Grado (Bachelor)', 'Máster Universitario', 'Doctorado', 'Others'],
    normalizer: { 'Grado (Bachelor)': 'UNDERGRADUATE', 'Máster Universitario': 'POSTGRADUATE', 'Doctorado': 'DOCTORATE', 'Bachillerato': 'SCHOOLING', 'Ciclo Formativo de Grado Superior': 'VOCATIONAL' }
  },
  {
    country: 'Sri Lanka',
    isoCode: 'LK',
    levels: ['GCE O-Level', 'GCE A-Level', 'NVQ Diploma', 'Bachelor\'s Degree', 'Master\'s Degree / MPhil', 'PhD / Doctorate', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Master\'s Degree / MPhil': 'POSTGRADUATE', 'PhD / Doctorate': 'DOCTORATE', 'GCE O-Level': 'SCHOOLING', 'GCE A-Level': 'SCHOOLING', 'NVQ Diploma': 'VOCATIONAL' }
  },
  {
    country: 'Sweden',
    isoCode: 'SE',
    levels: ['Slutbetyg (Gymnasieskolan)', 'Högskoleexamen (Higher Ed Diploma)', 'Kandidatexamen (Bachelor)', 'Magister / Masterexamen', 'Doktorsexamen (PhD)', 'Others'],
    normalizer: { 'Kandidatexamen (Bachelor)': 'UNDERGRADUATE', 'Magister / Masterexamen': 'POSTGRADUATE', 'Doktorsexamen (PhD)': 'DOCTORATE', 'Slutbetyg (Gymnasieskolan)': 'SCHOOLING', 'Högskoleexamen (Higher Ed Diploma)': 'VOCATIONAL' }
  },
  {
    country: 'Switzerland',
    isoCode: 'CH',
    levels: ['Matura / Maturité', 'Federal Diploma of Higher Education', 'Bachelor Degree', 'Master Degree', 'Doctorate / PhD', 'Others'],
    normalizer: { 'Bachelor Degree': 'UNDERGRADUATE', 'Master Degree': 'POSTGRADUATE', 'Doctorate / PhD': 'DOCTORATE', 'Matura / Maturité': 'SCHOOLING', 'Federal Diploma of Higher Education': 'VOCATIONAL' }
  },
  {
    country: 'Taiwan',
    isoCode: 'TW',
    levels: ['Senior High School Diploma', 'Associate Degree (Junior College)', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctoral Degree', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctoral Degree': 'DOCTORATE', 'Senior High School Diploma': 'SCHOOLING', 'Associate Degree (Junior College)': 'VOCATIONAL' }
  },
  {
    country: 'Thailand',
    isoCode: 'TH',
    levels: ['Matayom 6 (High School)', 'Higher Certificate / Associate', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctoral Degree', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctoral Degree': 'DOCTORATE', 'Matayom 6 (High School)': 'SCHOOLING', 'Higher Certificate / Associate': 'VOCATIONAL' }
  },
  {
    country: 'Turkey',
    isoCode: 'TR',
    levels: ['Lise Diploması', 'Önlisans Derecesi (Associate)', 'Lisans Derecesi (Bachelor)', 'Yüksek Lisans Derecesi (Master)', 'Doktora Derecesi (PhD)', 'Others'],
    normalizer: { 'Lisans Derecesi (Bachelor)': 'UNDERGRADUATE', 'Yüksek Lisans Derecesi (Master)': 'POSTGRADUATE', 'Doktora Derecesi (PhD)': 'DOCTORATE', 'Lise Diploması': 'SCHOOLING', 'Önlisans Derecesi (Associate)': 'VOCATIONAL' }
  },
  {
    country: 'United Arab Emirates',
    isoCode: 'AE',
    levels: ['High School Certificate', 'Higher Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate / PhD', 'Others'],
    normalizer: { 'Bachelor\'s Degree': 'UNDERGRADUATE', 'Master\'s Degree': 'POSTGRADUATE', 'Doctorate / PhD': 'DOCTORATE', 'High School Certificate': 'SCHOOLING', 'Higher Diploma': 'VOCATIONAL' }
  },
  {
    country: 'United Kingdom',
    isoCode: 'GB',
    levels: ['GCSE / O-Levels', 'A-Levels', 'BTEC / NVQ / HND', 'Foundation Degree', 'Bachelor\'s Degree (Honours)', 'Master\'s Degree (MA / MSc / MPhil)', 'PhD / Doctorate', 'Others'],
    normalizer: { 'Bachelor\'s Degree (Honours)': 'UNDERGRADUATE', 'Master\'s Degree (MA / MSc / MPhil)': 'POSTGRADUATE', 'PhD / Doctorate': 'DOCTORATE', 'GCSE / O-Levels': 'SCHOOLING', 'A-Levels': 'SCHOOLING', 'BTEC / NVQ / HND': 'VOCATIONAL', 'Foundation Degree': 'VOCATIONAL' }
  },
  {
    country: 'United States',
    isoCode: 'US',
    levels: ['High School Diploma', 'GED', 'Vocational Certificate', 'Associate Degree (AA / AS)', 'Bachelor\'s Degree (BA / BS)', 'Master\'s Degree (MA / MS / MBA)', 'Doctorate (PhD / MD / JD)', 'Others'],
    normalizer: { 'Bachelor\'s Degree (BA / BS)': 'UNDERGRADUATE', 'Master\'s Degree (MA / MS / MBA)': 'POSTGRADUATE', 'Doctorate (PhD / MD / JD)': 'DOCTORATE', 'High School Diploma': 'SCHOOLING', 'GED': 'SCHOOLING', 'Vocational Certificate': 'VOCATIONAL', 'Associate Degree (AA / AS)': 'VOCATIONAL' }
  },
  {
    country: 'Vietnam',
    isoCode: 'VN',
    levels: ['Bằng Tốt nghiệp THPT', 'Bằng Tốt nghiệp Cao đẳng', 'Bằng Cử nhân (Bachelor)', 'Bằng Thạc sĩ (Master)', 'Bằng Tiến sĩ (PhD)', 'Others'],
    normalizer: { 'Bằng Cử nhân (Bachelor)': 'UNDERGRADUATE', 'Bằng Thạc sĩ (Master)': 'POSTGRADUATE', 'Bằng Tiến sĩ (PhD)': 'DOCTORATE', 'Bằng Tốt nghiệp THPT': 'SCHOOLING', 'Bằng Tốt nghiệp Cao đẳng': 'VOCATIONAL' }
  }
];

// 2. Global Dynamic Option Streams
export const UG_COURSES: string[] = ['Bachelor of Arts (BA)', 'Bachelor of Science (BSc / BS)', 'Bachelor of Commerce (BCom)', 'Bachelor of Technology / Engineering (B.Tech / B.E / BEng / BASc)', 'Bachelor of Business Administration (BBA / BBM / BBS)', 'Bachelor of Computer Applications / Computer Science (BCA / BCS / BSCS)', 'Bachelor of Medicine, Bachelor of Surgery (MBBS / MD / BMBS)', 'Bachelor of Laws (LLB / JD)', 'Bachelor of Education (B.Ed / BA Ed / BEd)', 'Others'];
export const PG_COURSES: string[] = ['Master of Arts (MA)', 'Master of Science (MSc / MS)', 'Master of Business Administration (MBA)', 'Master of Technology / Engineering (MTech / M.E / MEng)', 'Master of Computer Applications / CS (MCA / MCS / MSCS)', 'Master of Laws (LLM)', 'Master of Public Health (MPH)', 'Master of Social Work (MSW)', 'Master of Education (M.Ed)', 'Others'];
export const DOCTORATE_COURSES: string[] = ['Doctor of Philosophy (PhD)', 'Doctor of Medicine (MD)', 'Doctor of Education (EdD)', 'Doctor of Science (DSc / ScD)', 'Doctor of Laws (LLD / LLDeg)', 'Others'];

export const BA_SPECIALIZATIONS: string[] = ['English', 'History', 'Geography', 'Political Science / International Relations', 'Economics', 'Psychology', 'Sociology', 'Philosophy', 'Public Administration', 'Journalism & Mass Communication', 'Languages & Literature', 'Anthropology', 'Home Science', 'Others'];
export const BSC_SPECIALIZATIONS: string[] = ['Physics', 'Chemistry', 'Biology / Biological Sciences', 'Mathematics', 'Zoology', 'Botany', 'Microbiology', 'Geology / Earth Sciences', 'Environmental Science', 'Statistics', 'Biotechnology', 'Nursing', 'Nutrition & Food Science', 'Forensic Science', 'Computer Science / IT', 'Others'];
export const ENGINEERING_SPECIALIZATIONS: string[] = ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Electronics & Communication Engineering', 'Computer Science & Engineering', 'Information Technology', 'Chemical Engineering', 'Aeronautical / Aerospace Engineering', 'Automobile / Automotive Engineering', 'Biomedical Engineering', 'Petroleum Engineering', 'Metallurgical & Materials Engineering', 'Mining Engineering', 'Textile Engineering', 'Agricultural Engineering', 'Data Science & Artificial Intelligence', 'Others'];

export const SPECIALIZATION_MAP: Record<string, string[]> = {
  'Bachelor of Arts (BA)': BA_SPECIALIZATIONS,
  'Bachelor of Science (BSc / BS)': BSC_SPECIALIZATIONS,
  'Bachelor of Technology / Engineering (B.Tech / B.E / BEng / BASc)': ENGINEERING_SPECIALIZATIONS,
  'Master of Arts (MA)': BA_SPECIALIZATIONS,
  'Master of Science (MSc / MS)': [...BSC_SPECIALIZATIONS, 'Applied Mathematics', 'Data Analytics'],
  'Master of Technology / Engineering (MTech / M.E / MEng)': [...ENGINEERING_SPECIALIZATIONS, 'Robotics', 'Power Systems'],
  'Doctor of Philosophy (PhD)': ['Physics', 'Chemistry', 'Biological Sciences', 'Mathematics', 'Computer Science', 'Economics', 'Others']
};

export const PROGRAMS_BY_LEVEL: Record<string, string[]> = {
  'UNDERGRADUATE': UG_COURSES,
  'POSTGRADUATE': PG_COURSES,
  'DOCTORATE': DOCTORATE_COURSES
};