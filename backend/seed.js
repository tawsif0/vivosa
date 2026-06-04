require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const Kid = require("./models/Kid");
const WomenApparel = require("./models/WomenApparel");
const MenApparel = require("./models/MenApparel");
const User = require("./models/User");
const SustainableLeather = require("./models/SustainableLeather");
const cloudinary = require("./utils/cloudinary");

async function uploadToCloudinary(localPathOrUrl, folder) {
  if (!localPathOrUrl) return null;
  let fullPath = localPathOrUrl;
  if (localPathOrUrl.startsWith("/")) {
    fullPath = path.join(__dirname, "../client/public", localPathOrUrl);
  } else if (!path.isAbsolute(localPathOrUrl)) {
    fullPath = path.resolve(localPathOrUrl);
  }

  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}, using placeholder.`);
    return {
      url: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
      publicId: "sample"
    };
  }

  try {
    const res = await cloudinary.uploader.upload(fullPath, { folder });
    return {
      url: res.secure_url,
      publicId: res.public_id
    };
  } catch (err) {
    console.error(`Failed to upload ${fullPath} to Cloudinary:`, err);
    throw err;
  }
}

// ESM parser helper
function parseEsmArray(filePath, arrayName) {
  let content = fs.readFileSync(filePath, "utf8");
  // Remove imports
  content = content.replace(/import\s+.*?\s+from\s+['"].*?['"];?/g, "");
  // Comment out existing const placeholder to prevent duplicates
  content = content.replace(/const\s+placeholder\s*=/g, "// const placeholder =");
  
  // Inject mock colors and constants
  content = `
    const sweaterColors = [
      { name: "Black", hex: "#0b0b0b" },
      { name: "Pink", hex: "#e83a7a" },
      { name: "Green", hex: "#0a7a63" },
      { name: "Gray", hex: "#4b4f56" },
      { name: "Blue", hex: "#2d86b8" },
      { name: "Yellow", hex: "#f2b400" },
      { name: "Brown", hex: "#8b3f2e" },
      { name: "Navy", hex: "#2f4d86" }
    ];
    const jacketColors = [
      { name: "Black", hex: "#000000" },
      { name: "Pink", hex: "#e84a7a" },
      { name: "Teal", hex: "#0c7f6b" },
      { name: "Charcoal", hex: "#4a4a52" },
      { name: "Sky Blue", hex: "#2a8bc8" },
      { name: "Yellow", hex: "#f2c230" },
      { name: "Brown", hex: "#7a3b2e" },
      { name: "Blue", hex: "#3f63a8" }
    ];
    const placeholder = "/jackets/placeholder.svg";
    ${content}
  `;
  // Replace export with standard const
  content = content.replace(/export\s+const\s+(\w+)\s*=/g, "const $1 =");
  // Append module.exports
  content += `\nmodule.exports = ${arrayName};`;

  const tempPath = filePath.replace(".js", "_temp_cjs.cjs");
  fs.writeFileSync(tempPath, content, "utf8");
  try {
    const data = require(tempPath);
    fs.unlinkSync(tempPath);
    return data;
  } catch (err) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    throw err;
  }
}

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB.");

  // Clear existing items
  console.log("Clearing existing Kids, Women, Men Apparel & Sustainable Leather collections...");
  await Kid.deleteMany({});
  await WomenApparel.deleteMany({});
  await MenApparel.deleteMany({});
  await SustainableLeather.deleteMany({});

  // Get or create an admin user
  let admin = await User.findOne({ userType: "admin" });
  if (!admin) {
    console.log("No admin user found. Creating default admin...");
    admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      userType: "admin",
      isEmailVerified: true,
    });
  }

  // 1. Seed Kids wear
  console.log("Fetching previous kids wear data from git history...");
  const kidsFileContent = execSync("git show f30cdf3:client/src/data/kidsProducts.js").toString("utf8");
  // Simple regex conversion from ESM to CommonJS list
  let cleanKidsContent = kidsFileContent.replace(/export\s+const\s+kidsProducts\s*=/g, "module.exports =");
  const tempKidsPath = path.join(__dirname, "kidsProducts_temp_cjs.cjs");
  fs.writeFileSync(tempKidsPath, cleanKidsContent, "utf8");
  const kidsProducts = require(tempKidsPath);
  fs.unlinkSync(tempKidsPath);

  console.log(`Seeding ${kidsProducts.length} Kids products...`);
  for (const item of kidsProducts) {
    const compositionHtml = (item.composition || []).map(line => `<p>${line}</p>`).join("");
    const uploaded = await uploadToCloudinary(item.image, "vivosa/kids");
    await Kid.create({
      title: item.style || "Kid's apparel item",
      materialComposition: compositionHtml,
      productProduction: "<p>Premium safety-inspected manufacturing suitable for kids apparel.</p>",
      image: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
      createdBy: admin._id,
    });
  }

  // 2. Seed Women's Sweaters
  console.log("Seeding Women's Sweaters...");
  const sweaterColors = [
    { name: "Black", hex: "#0b0b0b" },
    { name: "Pink", hex: "#e83a7a" },
    { name: "Green", hex: "#0a7a63" },
    { name: "Gray", hex: "#4b4f56" },
    { name: "Blue", hex: "#2d86b8" },
    { name: "Yellow", hex: "#f2b400" },
    { name: "Brown", hex: "#8b3f2e" },
    { name: "Navy", hex: "#2f4d86" },
  ];
  const sweatersPath = path.join(__dirname, "../client/src/data/womensSweaters.js");
  const womensSweaters = parseEsmArray(sweatersPath, "womensSweaters");

  for (const item of womensSweaters) {
    const compositionHtml = (item.composition || []).map(line => `<p>${line}</p>`).join("");
    const variants = (item.colors || sweaterColors).map(c => ({
      type: "color",
      label: c.name,
      value: c.hex,
    }));
    const uploaded = await uploadToCloudinary(item.image, "vivosa/women");
    await WomenApparel.create({
      title: item.title,
      description: compositionHtml,
      category: "sweater",
      colorSectionTitle: "AVAILABLE COLORS",
      image: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
      variants,
      createdBy: admin._id,
    });
  }

  // 3. Seed Women's Jackets
  console.log("Seeding Women's Jackets...");
  const jacketColors = [
    { name: "Black", hex: "#000000" },
    { name: "Pink", hex: "#e84a7a" },
    { name: "Teal", hex: "#0c7f6b" },
    { name: "Charcoal", hex: "#4a4a52" },
    { name: "Sky Blue", hex: "#2a8bc8" },
    { name: "Yellow", hex: "#f2c230" },
    { name: "Brown", hex: "#7a3b2e" },
    { name: "Blue", hex: "#3f63a8" },
  ];
  const jacketsPath = path.join(__dirname, "../client/src/data/womensJackets.js");
  const womensJackets = parseEsmArray(jacketsPath, "womensJackets");

  for (const item of womensJackets) {
    const compositionHtml = (item.composition || []).map(line => `<p>${line}</p>`).join("");
    const variants = (item.colors || jacketColors).map(c => ({
      type: "color",
      label: c.name,
      value: c.hex,
    }));
    const uploaded = await uploadToCloudinary(item.image, "vivosa/women");
    await WomenApparel.create({
      title: item.title,
      description: compositionHtml,
      category: "jackets-coats",
      colorSectionTitle: "AVAILABLE COLORS",
      image: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
      variants,
      createdBy: admin._id,
    });
  }

  // 4. Seed Women's Pants
  console.log("Seeding Women's Pants...");
  const pantsPath = path.join(__dirname, "../client/src/data/womensPantsProducts.js");
  const womensPants = parseEsmArray(pantsPath, "womensPants");

  for (const item of womensPants) {
    const compositionHtml = (item.composition || []).map(line => `<p>${line}</p>`).join("");
    const uploadedMain = await uploadToCloudinary(item.image, "vivosa/women");
    const variants = await Promise.all(
      (item.detailImages || []).map(async (img, idx) => {
        const uploadedVar = await uploadToCloudinary(img, "vivosa/women");
        return {
          type: "custom",
          label: `Option ${idx + 1}`,
          value: "OPTIONS & STYLES",
          image: {
            url: uploadedVar.url,
            publicId: uploadedVar.publicId,
          },
        };
      })
    );
    await WomenApparel.create({
      title: item.title,
      description: compositionHtml,
      category: "pants",
      customSectionTitle: "OPTIONS & STYLES",
      image: {
        url: uploadedMain.url,
        publicId: uploadedMain.publicId,
      },
      variants,
      createdBy: admin._id,
    });
  }

  // 5. Seed Women's Swim & Lingerie
  console.log("Seeding Women's Swim & Lingerie...");
  const swimPath = path.join(__dirname, "../client/src/data/swimLingerieProducts.js");
  const swimProducts = parseEsmArray(swimPath, "swimLingerieProducts");

  for (const item of swimProducts) {
    const compositionHtml = (item.details || []).map(line => `<p>${line}</p>`).join("");
    const uploadedMain = await uploadToCloudinary(item.cardImage, "vivosa/women");
    const variants = await Promise.all(
      (item.detailImages || []).map(async (img, idx) => {
        const uploadedVar = await uploadToCloudinary(img, "vivosa/women");
        return {
          type: "custom",
          label: `Option ${idx + 1}`,
          value: "OPTIONS & STYLES",
          image: {
            url: uploadedVar.url,
            publicId: uploadedVar.publicId,
          },
        };
      })
    );
    await WomenApparel.create({
      title: item.title,
      description: compositionHtml,
      category: "swim-lingerie",
      customSectionTitle: "OPTIONS & STYLES",
      image: {
        url: uploadedMain.url,
        publicId: uploadedMain.publicId,
      },
      variants,
      createdBy: admin._id,
    });
  }

  // 6. Seed Men's Sweaters
  console.log("Seeding Men's Sweaters...");
  const menSweatersPath = path.join(__dirname, "../client/src/data/mensSweaters.js");
  const menSweaters = parseEsmArray(menSweatersPath, "mensSweaters");

  for (const item of menSweaters) {
    const compositionHtml = (item.composition || []).map(line => `<p>${line}</p>`).join("");
    const variants = (item.colors || sweaterColors).map(c => ({
      type: "color",
      label: c.name,
      value: c.hex,
    }));
    const uploaded = await uploadToCloudinary(item.image, "vivosa/men");
    await MenApparel.create({
      title: item.title,
      description: compositionHtml,
      category: "sweater",
      colorSectionTitle: "AVAILABLE COLORS",
      image: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
      variants,
      createdBy: admin._id,
    });
  }

  // 7. Seed Men's Jackets
  console.log("Seeding Men's Jackets...");
  const menJacketsPath = path.join(__dirname, "../client/src/data/mensJackets.js");
  const menJackets = parseEsmArray(menJacketsPath, "mensJackets");

  for (const item of menJackets) {
    const compositionHtml = (item.composition || []).map(line => `<p>${line}</p>`).join("");
    const variants = (item.colors || jacketColors).map(c => ({
      type: "color",
      label: c.name,
      value: c.hex,
    }));
    const uploaded = await uploadToCloudinary(item.image, "vivosa/men");
    await MenApparel.create({
      title: item.title,
      description: compositionHtml,
      category: "jackets-coats",
      colorSectionTitle: "AVAILABLE COLORS",
      image: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
      variants,
      createdBy: admin._id,
    });
  }

  // 8. Seed Men's Pants
  console.log("Seeding Men's Pants...");
  const menPantsPath = path.join(__dirname, "../client/src/data/mensPantsProducts.js");
  const menPants = parseEsmArray(menPantsPath, "mensPants");

  for (const item of menPants) {
    const compositionHtml = (item.composition || []).map(line => `<p>${line}</p>`).join("");
    const uploadedMain = await uploadToCloudinary(item.image, "vivosa/men");
    const variants = await Promise.all(
      (item.detailImages || []).map(async (img, idx) => {
        const uploadedVar = await uploadToCloudinary(img, "vivosa/men");
        return {
          type: "custom",
          label: `Option ${idx + 1}`,
          value: "OPTIONS & STYLES",
          image: {
            url: uploadedVar.url,
            publicId: uploadedVar.publicId,
          },
        };
      })
    );
    await MenApparel.create({
      title: item.title,
      description: compositionHtml,
      category: "pants",
      customSectionTitle: "OPTIONS & STYLES",
      image: {
        url: uploadedMain.url,
        publicId: uploadedMain.publicId,
      },
      variants,
      createdBy: admin._id,
    });
  }

  // 9. Seed Contract Furniture
  console.log("Seeding Contract Furniture...");
  const contractFurnitureData = [
    {
      code: "F018MBD",
      img: "/images/contract-furniture/43_Screenshot_1-2.png",
      name: "Turquoise",
      desc: "Nubuck Top Grain — 1.0 / 1.2 mm",
      origin: "EU + GB",
      details: "This leather is characterized by a soft, velvety texture and a natural appearance, infused with a luxurious feel. It is suitable for all types of high-end and durable applications, including both contract and home furniture uses. (More colours are available, and it can be customized through retanning, dyeing, and finishing processes to suit different product requirements)."
    },
    {
      code: "F029SA",
      img: "/images/contract-furniture/44_Screenshot_2-1.png",
      name: "Pale Beige",
      desc: "Pure Aniline / Full Grain — 1.0 / 1.2 mm",
      origin: "European",
      details: "This leather preserves the hide's natural grain and patterns without the need for an outer coating or pigment, giving it a rich appearance and supple texture. It provides long-lasting durability and luxury for the furniture sector and is extraordinary for its natural look and feel. (More colors are available with customization options)."
    },
    {
      code: "F018TC",
      img: "/images/contract-furniture/45_Screenshot_3-1.png",
      name: "Orangey Brown",
      desc: "Semi-Aniline — 1.1 / 1.2 mm",
      origin: "GB+NZ",
      details: "This is natural grain leather that has been slightly buffed to give an aged appearance in specific areas of the hide. It is immersed in oil for several hours, producing a subtle two-tone effect with a natural gloss. (More colours are available, and customization is possible to suit different product requirements)."
    },
    {
      code: "F025 LEO",
      img: "/images/contract-furniture/46_Screenshot_4-1.png",
      name: "Deep Black",
      desc: "Semi-Aniline / Corrected Grain — 1.2 – 1.4 mm",
      origin: "GB, EU, BR",
      details: "This is a pigmented, corrected-grain leather with an anti-stain finish and a uniform appearance. It provides a smooth hand feel and a vibrant surface effect. A fine spray of pigment is applied during finishing, creating a compact coating that enhances durability and stain resistance. Highly suitable for all types of furniture applications. (More colours available. Can be customized during the retanning, dyeing, and finishing processes for specific product requirements.)"
    },
    {
      code: "F45 MBGRC",
      img: "/images/contract-furniture/47_Screenshot_5-1.png",
      name: "Teal Blue",
      desc: "Aniline / Nappa — 1.0 – 1.2 mm",
      origin: "European",
      details: "This is a beautiful Nappa leather with a flat, consistent surface. Its soft touch and solid body make it particularly suitable for high-end furniture and leather goods, adding exceptional value and sophistication to luxurious designs. The leather's natural grain enhances its rich texture and depth of colour, reflecting the true elegance of fine European craftsmanship. (More colours available. Can be customized upon request.)"
    },
    {
      code: "F039LNB",
      img: "/images/contract-furniture/48_Screenshot_6-1.png",
      name: "Teflon Brown",
      desc: "Pure Aniline / Natural Grain — 1.0 – 1.2 mm",
      origin: "EU + GB",
      details: "This is a pure aniline leather with a nubuck surface that has been treated with oils and waxes to enhance its natural nap. It features a natural grain, a soft, delicate hand, and a subtle waxy finish. Longbeach's slightly napped surface is achieved through a special process that gives the leather a rich and refined appearance. More colours available, can be customized."
    },
    {
      code: "F013DB",
      img: "/images/contract-furniture/49_Screenshot_7-1.png",
      name: "White",
      desc: "Semi-Aniline / Pronounced Grain — 1.0 – 1.2 mm",
      origin: "EU + Extra",
      details: "This leather is inspired by the natural colours seen from a balcony or in a restaurant setting. It evokes the warmth of a sunny afternoon, with hues reminiscent of rolling hills and the sea — vibrant and full of life, instilling a profound sense of comfort and pleasure. Designed for outdoor use, it is resistant to water, sunlight, rain, salt, and humidity, ensuring long-lasting beauty and sophistication in any furniture application. (More colours available. Can be modified for different product uses)."
    },
    {
      code: "F05DHY",
      img: "/images/contract-furniture/50_Screenshot_8-1.png",
      name: "Lite Olive",
      desc: "Semi-aniline full grain — 1.2 – 1.4 mm",
      origin: "EU + Extra EU",
      details: "This leather is inspired by the colours of nature as seen from a balcony or restaurant setting. It offers the warmth of a sunny afternoon, where the tones of the earth, hills, and sea burst with vibrant colour, evoking a profound sense of pleasure. It is resistant to water, sunlight, rainfall, salt, and humidity, and is designed to last while adding a sophisticated and beautiful look to outdoor furniture. More colours available. Can be customized for different product uses."
    },
    {
      code: "F09MBEPL",
      img: "/images/contract-furniture/51_Screenshot_9-1.png",
      name: "Purple",
      desc: "Semi-aniline / Flat grain — 1.0 – 1.2 mm",
      origin: "Europe",
      details: "Tanned using advanced techniques and finished with a flat grain, this leather features a subtle sheen and an even, consistent colour — making it ideal for furniture and contract design. (More colours available. The tanning, re-tanning, dyeing, and finishing processes can be customized for different product applications)."
    },
    {
      code: "F011LEO",
      img: "/images/contract-furniture/52_Screenshot_10-1.png",
      name: "Peach",
      desc: "Pure Aniline / Fine Grain — 1.0 – 1.1 mm",
      origin: "Europe",
      details: "This leather embodies timeless elegance while maintaining its natural fine-grain texture and softness. This high-quality material adds a sense of sophistication to any piece, making it an excellent choice for those seeking authentic and refined upholstery. (More colours available, with customization options for different applications)."
    },
    {
      code: "F035MAC",
      img: "/images/contract-furniture/53_Screenshot_11-1.png",
      name: "Dark Blue",
      desc: "Semi-Aniline / Full Grain — 1.3 – 1.5 mm",
      origin: "GB + EU",
      details: "This premium semi-aniline heavyweight leather is full-grain, supple, and naturally breathable. It offers outstanding durability and comfort, making it ideal for high-end furniture and interior applications where both luxury and performance are desired. (More colours available. Customization options are also possible for different product uses)."
    },
    {
      code: "F09DODA",
      img: "/images/contract-furniture/54_Screenshot_12-1.png",
      name: "Grey",
      desc: "Semi-Aniline / Full Grain — 1.4 – 1.6 mm",
      origin: "EU + BR",
      details: "A special finishing technique enhances the surface of this leather, adding a refined gloss and transparency that highlight its natural grain. This medium-thick leather feels smooth, full, and warm to the touch. Versatile and elegant, it is ideal for luxury hospitality and interior furniture applications and is even perfect for leather goods. (More colours available, with customization options for different applications)."
    }
  ];

  for (const item of contractFurnitureData) {
    const uploaded = await uploadToCloudinary(item.img, "vivosa/sustainable-leather");
    await SustainableLeather.create({
      title: `${item.code} ${item.name}`,
      fullName: `${item.code}, ${item.name} — ${item.desc}`,
      subtitle: "SUSTAINABLE CONTRACT & FURNITURE LEATHER",
      thickness: item.desc.split("•").pop().trim().split("—").pop().trim(),
      rawhide: item.origin,
      image: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
      productDetails: `<p>${item.details}</p>`,
      desc: `<p>${item.details}</p>`,
      category: "contract-furniture",
      code: item.code,
      name: item.name,
      type: item.desc.split("—")[0].trim(),
      createdBy: admin._id,
    });
  }

  // 10. Seed Leather for Footwear
  console.log("Seeding Leather for Footwear...");
  const footwearPath = path.join(__dirname, "../client/src/pages/footwearData.js");
  const footwearProducts = parseEsmArray(footwearPath, "footwearProducts");

  for (const item of footwearProducts) {
    const uploaded = await uploadToCloudinary(item.src, "vivosa/sustainable-leather");
    await SustainableLeather.create({
      title: item.title,
      fullName: item.fullName,
      subtitle: item.subtitle,
      thickness: item.thickness,
      rawhide: item.rawhide,
      image: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
      rawMaterial: item.rawMaterial,
      processing: item.processing,
      productDetails: `<p>${item.productDetails}</p>`,
      desc: `<p>${item.desc}</p>`,
      category: "leather-footwear",
      code: item.title.split(",")[0].trim(),
      name: item.title.split(",")[1]?.trim() || item.title,
      createdBy: admin._id,
    });
  }

  // 11. Seed Leather Goods
  console.log("Seeding Leather Goods...");
  const leatherGoodsPath = path.join(__dirname, "../client/src/pages/leatherGoodsData.js");
  const leatherGoodsProducts = parseEsmArray(leatherGoodsPath, "leatherGoodsProducts");

  for (const item of leatherGoodsProducts) {
    const uploaded = await uploadToCloudinary(item.src, "vivosa/sustainable-leather");
    await SustainableLeather.create({
      title: item.title,
      colorName: item.colorName,
      fullName: item.fullName,
      subtitle: item.subtitle,
      thickness: item.thickness,
      rawhide: item.rawhide,
      image: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
      rawMaterial: item.rawMaterial,
      processing: item.processing,
      productDetails: `<p>${item.productDetails}</p>`,
      desc: `<p>${item.desc}</p>`,
      category: "leather-goods",
      code: item.title.split(",")[0].trim(),
      name: item.colorName,
      createdBy: admin._id,
    });
  }

  // 12. Seed Leather Lining
  console.log("Seeding Leather Lining...");
  const leatherLiningPath = path.join(__dirname, "../client/src/pages/leatherLiningData.js");
  const leatherLiningProducts = parseEsmArray(leatherLiningPath, "leatherLiningProducts");

  for (const item of leatherLiningProducts) {
    const uploaded = await uploadToCloudinary(item.src, "vivosa/sustainable-leather");
    await SustainableLeather.create({
      title: item.title,
      colorName: item.colorName,
      fullName: item.fullName,
      subtitle: item.subtitle,
      thickness: item.thickness,
      rawhide: item.rawhide,
      image: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
      rawMaterial: item.rawMaterial,
      processing: item.processing,
      productDetails: `<p>${item.productDetails}</p>`,
      desc: `<p>${item.desc}</p>`,
      category: "leather-lining",
      code: item.title.split(",")[0].trim(),
      name: item.colorName,
      createdBy: admin._id,
    });
  }

  // 13. Seed Automotive
  console.log("Seeding Automotive...");
  const automotiveData = [
    {
      code: "F08CNA",
      name: "Tan",
      type: "Nappa / Full-Grain",
      thickness: "1.0 – 1.2 mm",
      rawhide: "GB",
      desc: "This Nappa automotive leather is color-dyed through and embossed bovine leather. It features a completely water-based finishing process, offering a contemporary style with a smooth and silky feel.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMXTWlABE1FDHDLfNMMQpVQEqFst8PWm80zw3S5Lt7ifGxz4odH-DAfsRKE9z9pQs9VFBU4bvaOVsBuC3zKPBt1Ls_OJRAiFQIEuHvLyLEqRO3rfJVl_wKAI9ZWVjSh4ulD05dpU_edkjiWRLCVk3IcI6SV6U2I-VXPFpdevji2vxtNt80rGehxqYDw1qjmXXfJ3kGkMP-2X3Px14FTvrGNNS4fRnX8ccRYdwl1vD0fb2pUduCK32_C-7feFvV0D3PHfRLbt1WquE",
    },
    {
      code: "F012LECA",
      name: "Light Grey",
      type: "Semi-Aniline / Corrected Grain",
      thickness: "1.2 – 1.4 mm",
      rawhide: "Irish / GB",
      desc: "Features a thick, uniform finish treated with a resilient protective coating. Exceptional resistance to soiling, fading, abrasion, and cleaning solutions, while feeling natural and soft.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIN9GRef3wK6-MgVfPF45nKjGLDNydqpMOtwZbb9pvkSqQRX9XxAUuOwxcVHRgOKnLxPcK4wi-YW59exYvRGYwiLo4KofAJLWGdwOIY_7EOrhl-DXeKTxrNxhoERvPkXTaEqcI34JIwt6ziCP633m81dvZ14MWXzGveiouLpXgnTjBw4sOp4iLMRYG8aBwLhvaxatnThVXN8R1g7uEGQbztcNoNgCzWWsFB2ZCClhdC7lbnFNVH2Hriz17nrCMypm_xJ1I9oahwFA",
    },
    {
      code: "F029EELB",
      name: "Green",
      type: "Aniline / Full Grain",
      thickness: "1.2 – 1.4 mm",
      rawhide: "EU Sourcing",
      desc: "The softest, smoothest, and most premium aniline leather, while also being very strong, with a subtle batik appearance. Features the beautiful, organic markings of natural hides.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR1CxzW2mxYrYtpL7XjsPS4dKBNFizuh3L3AhnHaondDfie40K6PYkg9IZLPTRP_ztSiPJ2Nb6XKZ7YpfsRbHJzV48uakCWLHyqp26doL9RPkYGdluTdoVMSYC2aBktiB2rCP-EW3phFy_ZXOZsOBG6R5Xeb67vCDJQftxyN39JjxbCqO8PLOHigtHs9XPV28TMqChPO4uCoHV0sHGJb82VUStAKvbQ1et3pbAgyW747UcLAwiDg_4_HT7fuNOI3eJWrf33CMhgm4",
    },
    {
      code: "F018ELET",
      name: "Grey",
      type: "Semi-Aniline / Full Grain",
      thickness: "1.3 – 1.5 mm",
      rawhide: "EU Sourcing",
      desc: "Developed to meet strict automotive safety standards. Features a structured yet soft feel, combining extreme durability with the natural elegance of premium leather.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3YDDwzXod-aPXAe0qVV2wlw72bN67d-LrrRkSLQQjIIc5WioT1ZT6tFmK6gy-08OCzGeXOik1ejgKWgNspmHWj_N7M0pNJtYLS-JKyCcppDcnL4WyQDWqex_oZJBDZDnMPCcZwihevHr29igRy65b9C7Kdz2lkIpJhsoHyMoi6_6Tlk6Atm1Owx9Rf9urYJG8a28uCilZFvSnvcOqPeeVx2Y5L_cMgc9yM9cg2uh24NAWWe4_wHoA75LEYVLJR8zSeJVc6i0VNa4",
    },
    {
      code: "F08WLNA",
      name: "Light Mauve",
      type: "Nappa / Full Grain",
      thickness: "1.0 – 1.2 mm",
      rawhide: "EU Sourcing",
      desc: "Distinctively smooth texture and a tender touch, making it the epitome of elegance. Aniline-dyed and carefully finished, perfect for upholstering luxury cars.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfwT3GpeVX7RyANPYg7YczIT7S8Tehs7SEmz-UardO_-3lzgtY1txsCzMLDOantS1lpRHh4tQwrm38OHZrLlgodPjyvHXegoEBBcc3odegp6p5bc6scH_7xaXvWAr4uCKDELcuKCBRAnkhY5Ju9JiCs2WYDbTAgBhV_lRtCbPCzDCJ7L4Q2QFL0CT6C_ySy5Xg6AC5WEmKWZVAz4tmiWK1CiRAXPM7GuoDGGPjsZJY6TYnvxg85_DwHnAmoQZAP0kLgZE4EohpUSQ",
    },
    {
      code: "F014WLD",
      name: "Leather",
      type: "Semi-Aniline / Pigmented",
      thickness: "1.1 – 1.2 mm",
      rawhide: "GB + EU Sourcing",
      desc: "Dakota's firm hand and tactile feel deliver high efficiency and dependability. Treated with premium water-based dyes and resins, blending style and everyday functionality.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBCRk0VN3gGRk8WHZTVCinAHrE_hCXytuO81ZMYlIgZtpFGQJXhP-BGJv5QwwpjgcEzKX7Chi4rgOlFfLUJNFHPVcGv-hanDbIN7yp-VyALmcWD9qpcbtr0YTinAzZUYFZmyMGKJtY4oVw4AHRprxNzNFY_o_EmBOxAUjmDYPCOCHTzngwU1tuz4G07GGNZLwKOp52xXU9vrA0e-IOqSMNWM3UYwPZDl_vvrqxQhcJhO1zfa2MiZ7CPdUDzofUq_wN1wf0Ije3iP8",
    },
    {
      code: "F018ELM",
      name: "Blue",
      type: "Aniline / Full Grain",
      thickness: "1.2 – 1.4 mm",
      rawhide: "GB Sourcing",
      desc: "Dyed with soluble aniline dyes for a soft, breathable, and luxurious finish. Ideal for premium automotive interior projects that demand absolute beauty and top performance.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_5H_g0d6y911Qe6mAi4-Y66ySxe2KtQOa1FgfAtgOja-U-GMDDqsvoyMTEDiI3mhZqBV95cemhCqUiD2ZRhpJtN6fT-tgqCiNlIU3LN7dRYF0MEXurXRLrAp8p3ZNwmIO4vJHY7gi6vA0Pc0-gmw5V31WKuI4dnLOFwEIlFUhEwnEvYY1DEol40EYKZw9NpEZoiVCh0bN7je1Wlz3SpSSl02EU2pRdLgO8jNSJcgFpEx7XUYVMN7ogpxyaGqn64yc66SzKGMK8g",
    },
    {
      code: "028MAT",
      name: "Ice White",
      type: "Semi-Aniline / Full Grain",
      thickness: "1.3 – 1.5 mm",
      rawhide: "GB Sourcing",
      desc: "A heavy, structured body with a soft touch. A light protective layer preserves the natural look and feel while offering high durability and stain resistance for a clean interior.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_xAAvafea7t6RUbOCokwfkWzobVjcWxnY3aDWiTZHDpuFSuzNWQdmtU9NVIUnwIcXIjnxWiWz2Gbu9FTPHhzU7VK2ru44P9BTZ0q1s4NEttUTi9Ifg0mLdjFCa6YdtVy9wxEqbpFtKf3I9Xc97-7o8gBRmP3iJxu-ymI4FuqNbzX-x3fEnRQg_NHWaD-TJt4PMO7PChbVVp7PFO6cQxBvJQDojOuQBzE2C7irvMQuWFHgPBFZCxm-MgEswCFVUv44HPq26ZXhfAc",
    },
    {
      code: "010ELM",
      name: "Light Pink",
      type: "Semi-Aniline / Full Grain",
      thickness: "1.2 – 1.4 mm",
      rawhide: "European Sourcing",
      desc: "Features highly luxurious soft hand with self-cleaning, antiviral, and antibacterial properties. Chrome-free and metal-free, combining premium quality with sustainability.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIdX9HvIOsXzW9SJJK11fZGhkSVuiHSfJmuO8pWuv6moYwnHhF7mc5FFmNiMDt_FGLdCNEnniu3rYt5Y-4YJD07ybAoVoUzYKhfRKve68s_LP3YMtfCHEuDrHOkSq4IM4LzSaoLTdTVHhNQQs7bE1VjMxZo9vZy1aM4NZ9C2uU73QwD8bbv1Q72m3ovDM2biGTFa8dQiG8ElhFfgkTyY8gDSWIqhqz1K4U4nfWXxvu7HaYO3xVDKHP0PD60rvqZzB1VL1brwmk1iY",
    },
    {
      code: "F016DNMT",
      name: "Black",
      type: "Nubuck / Full Grain",
      thickness: "1.4 – 1.6 mm",
      rawhide: "EU Sourcing",
      desc: "Distinguished by its natural grain, offering personality and a rich, supple appearance. Features anti-stain, fire-resistant, and water-resistant properties.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMj-RpRx81-0OTg051514GlZ1o0T5psG6DCtFfh920kxZR4V-hw3GEXth_WXnPPK8awVFd9UX4PZRLB5BW4RxSxRnvW948dah0KaSZIjCoBQhpn5ac-k0oj1LqXnkdEkNVQ3oQrMczudDPW_chbPx8mctF4fIX16JJgJSOQ3LdZKg4hOQGyhL3TLzP4YNt8VVh6rodOs9gcvVK0D02rlaoYd2IgBcdfk2akXlJgJqONF9NoD1GxU5btUmk1xDJSI-Qapem9EvKapc",
    },
    {
      code: "F012ELMANL",
      name: "Brown",
      type: "Aniline / Full Grain",
      thickness: "1.3 – 1.5 mm",
      rawhide: "EU Sourcing",
      desc: "Pure Aniline representing the softest, smoothest, and most exclusive leather. Natural creases, fat lines, and small healed scars reflect its organic nature.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzOcrrHnWcP4-ZDIhzHPaerzAnmbY0QTeD78AeYWdPnAt1b5Vdl-42EmThFBF6DqUAE_AGCCcRbjvWDqu5MMOqhe07lhCCHyP5B8MBocHiZEWhd4yttz1XL6Wf5kBnGvxPT23Z5m1cO6LOKNAezF78aukEdrXDiwbEVfcn0jaB0L1PNCWwWMSxI8VXjlD--25wyvTRIdr9zyaO-iqEbmVDc9me1CNhTP-YAhB4My0gAIfElrFJK3ChLv-y9owkiJ1JR20OrWjVZk",
    },
    {
      code: "F09DODA",
      name: "Grey",
      type: "Semi-Aniline / Full Grain",
      thickness: "1.4 – 1.6 mm",
      rawhide: "EU + BR Sourcing",
      desc: "Crafted using a special technique that adds gloss and transparency to the natural grain. With a medium thickness, it feels smooth, full, and warm to the touch.",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_Ft10bsuVuB_r9KQcWlHzsF-d5hVe5V0aVc2StqY0B7wMBGJLRdPbR1VSlWh0tqKh2-dphNfGEoUi7ZjXYzzBA4vnLkngMFmh56z4RDaaldgvI7lgptdU0sj3FblkN4A5f_lszS8fA__yw8UZ-0sXnvL3CAeVIWTCozBF2T_i01-zaMR0veegune4Uo7MhEx0Y1mxLxAKHsO9-shQzzT6rE7OlA-VR1_gs00gx3F_TjsNAQAE08u75gmeO7va7SitVgknXo86Y5Y",
    }
  ];

  for (const item of automotiveData) {
    let uploaded;
    if (item.src.startsWith("http")) {
      uploaded = { url: item.src, publicId: "" };
    } else {
      uploaded = await uploadToCloudinary(item.src, "vivosa/sustainable-leather");
    }
    await SustainableLeather.create({
      title: `${item.code} ${item.name}`,
      fullName: `${item.code}, ${item.name} — ${item.type}`,
      subtitle: "PREMIUM AUTOMOTIVE LEATHER HIDE",
      thickness: item.thickness,
      rawhide: item.rawhide,
      image: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
      desc: `<p>${item.desc}</p>`,
      category: "automotive",
      code: item.code,
      name: item.name,
      type: item.type,
      createdBy: admin._id,
    });
  }

  console.log("Database seeded successfully!");
  mongoose.connection.close();
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  mongoose.connection.close();
  process.exit(1);
});
