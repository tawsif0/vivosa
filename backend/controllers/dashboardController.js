const ContactSubmission = require("../models/ContactSubmission");
const Kid = require("../models/Kid");
const MenApparel = require("../models/MenApparel");
const WomenApparel = require("../models/WomenApparel");
const SustainableLeather = require("../models/SustainableLeather");

const countByStatus = async (Model, filter = {}) => {
  const [total, active] = await Promise.all([
    Model.countDocuments(filter),
    Model.countDocuments({ ...filter, isActive: true }),
  ]);

  return { total, active };
};

const getCategoryBreakdown = async (Model, categories) => {
  const rows = await Model.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: 1 },
        active: {
          $sum: {
            $cond: [{ $eq: ["$isActive", true] }, 1, 0],
          },
        },
      },
    },
  ]);

  const lookup = rows.reduce((acc, row) => {
    acc[row._id] = {
      total: row.total || 0,
      active: row.active || 0,
    };
    return acc;
  }, {});

  return categories.map((key) => ({
    key,
    total: lookup[key]?.total || 0,
    active: lookup[key]?.active || 0,
  }));
};

exports.getAdminOverview = async (req, res, next) => {
  try {
    const [contactTotals, kids, men, women, leather] = await Promise.all([
      (async () => {
        const [total, unread, read] = await Promise.all([
          ContactSubmission.countDocuments({}),
          ContactSubmission.countDocuments({ status: { $ne: "read" } }),
          ContactSubmission.countDocuments({ status: "read" }),
        ]);

        return { total, unread, read };
      })(),
      countByStatus(Kid),
      countByStatus(MenApparel),
      countByStatus(WomenApparel),
      countByStatus(SustainableLeather),
    ]);

    const [menCategories, womenCategories, leatherCategories] = await Promise.all([
      getCategoryBreakdown(MenApparel, [
        "sweater",
        "jackets-coats",
        "pants",
        "joggers",
        "polo-shirt",
        "shirts",
        "t-shirts",
      ]),
      getCategoryBreakdown(WomenApparel, [
        "sweater",
        "jackets-coats",
        "pants",
        "polo-shirts",
        "shirts",
        "t-shirts",
        "swim-lingerie",
      ]),
      getCategoryBreakdown(SustainableLeather, [
        "contract-furniture",
        "leather-footwear",
        "leather-goods",
        "leather-lining",
        "automotive",
      ]),
    ]);

    const totalProducts = kids.total + men.total + women.total + leather.total;
    const activeProducts = kids.active + men.active + women.active + leather.active;

    return res.json({
      success: true,
      overview: {
        contacts: contactTotals,
        collections: {
          kids,
          men,
          women,
          sustainableLeather: leather,
        },
        categories: {
          men: menCategories,
          women: womenCategories,
          sustainableLeather: leatherCategories,
        },
        totals: {
          products: totalProducts,
          activeProducts,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
