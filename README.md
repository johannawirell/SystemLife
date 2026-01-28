# 📱 App UI/UX Checklist

---

## ✅ Övergripande
- [ ] Appen känns snabb och responsiv
- [ ] Konsekvent design (färger, spacing, typografi)
- [ ] Ingen tydlig “webb-känsla”
- [ ] Fungerar lika bra på iOS och Android

---

## 🧭 Navigation
- [ ] Tydlig navigation (Stack eller Bottom Tabs)
- [ ] Max 3–5 huvudvyer
- [ ] Varje vy har tydlig titel
- [ ] Förutsägbar tillbaka-navigation

---

## 📐 Layout & Safe Areas
- [ ] Innehåll hamnar inte bakom notch / status bar
- [ ] `SafeAreaView` används på skärmnivå
- [ ] Konsekventa marginaler och padding
- [ ] Mobil-first layout

---

## 🎨 Färger & Typografi
- [ ] 1 primär färg
- [ ] 1 sekundär färg
- [ ] Neutrala gråskalor
- [ ] Tillräcklig kontrast
- [ ] Max 1–2 typsnitt

---

## 🔘 Knappar & Interaktion
- [ ] Touch-ytor minst 44px höga
- [ ] Tydlig primär knapp
- [ ] Sekundära actions visuellt nedtonade
- [ ] Knappar inaktiveras vid loading

---

## 📋 Listor
- [ ] Listor använder `FlatList`
- [ ] Tydlig klickyta per rad
- [ ] Varje item har titel + sekundär info
- [ ] Loading state visas
- [ ] Tom lista har ett “empty state”

---

## 📄 Detaljsidor
- [ ] Tydlig visuell hierarki
- [ ] Actions separerade från innehåll
- [ ] Viktiga actions lätta att nå

---

## 🔄 States & Feedback
- [ ] Loading state (spinner / skeleton)
- [ ] Error state med mänskligt felmeddelande
- [ ] Success feedback (toast / alert)
- [ ] Inga “tysta” actions

---

## ✍️ Formulär (om tillämpligt)
- [ ] Label ovanför input
- [ ] Validering vid submit
- [ ] Tydliga felmeddelanden
- [ ] Keyboard täcker inte inputfält

---

## ♿ Tillgänglighet (basic)
- [ ] Alla klickbara element har accessibility-label
- [ ] Text är läsbar (inte för liten)
- [ ] Ikoner kompletteras med text vid behov

---

## ⚙️ Teknisk kvalitet (UI)
- [ ] Återanvändbara UI-komponenter
- [ ] Ingen hårdkodad mock-data i UI
- [ ] Styles är strukturerade och konsekventa
- [ ] Onödiga re-renders undviks

---

## ✨ Bonus (valfritt)
- [ ] Dark mode
- [ ] Subtila animationer
- [ ] Haptisk feedback vid viktiga actions
