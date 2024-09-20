const router = require("express").Router();
const Auction =  require("../models/auction");
const Item = require("../models/item"); // Assuming you have an Item model
const Seller = require("../models/seller");

router.route("/add").post(async (req,res)=>{

    const { title, category, description, image, items,startingDateTime,location} = req.body;

    try {
        // Create a new Auction instance
        const newAuction = new Auction({
            title: title,
            category: category,
            description: description,
            image: image, // This could be a URL or base64 string, depending on how you're handling image uploads
            items: items || [],// Optional, can add ObjectIds for related items here
            startingDateTime:startingDateTime,
            location:location
        });

        // Save the new auction to the database
        const savedAuction = await newAuction.save();
        
        // Respond with success and the saved auction
        res.status(201).json({
            message: "Auction added successfully",
            auction: savedAuction
        });
    } catch (err) {
        // Handle any errors
        res.status(500).json({
            message: "Error adding auction",
            error: err.message
        });
    }

}
)

// Route to register a seller for an auction
router.post("/register", async (req, res) => {
    const { auctionId, userId } = req.body;
    try {
      const auction = await Auction.findById(auctionId);
      if (!auction) {
        return res.status(404).json({ message: "Auction not found" });
      }
  
      const user = await Seller.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Seller not found" });
      }
  
      // Add logic to register the user (you could maintain a list of registered users)
      auction.registeredUsers = auction.registeredUsers || [];
      if (auction.registeredUsers.includes(userId)) {
        return res.status(400).json({ message: "Already registered for this auction" });
      }
      auction.registeredUsers.push(userId);
  
      await auction.save();
      res.status(200).json({ message: "Seller registered for auction successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error registering for auction", error: err.message });
    }
  });


  // Route to get registered auctions for a seller
    router.post("/registered-auctions", async (req, res) => {
    const { userId } = req.body;
    try {
        const auctions = await Auction.find({ registeredUsers: userId });
        res.status(200).json(auctions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching registered auctions", error: err.message });
    }
    });

router.route("/all").get(async (req, res) => {
    try {
      const auctions = await Auction.find({});
      res.status(200).json(auctions);
    } catch (err) {
      res.status(500).json({ message: "Error fetching auctions", error: err.message });
    }
  });
  
  router.route("/:id").get(async (req, res) => {
    const { id } = req.params;
    try {
        const auction = await Auction.findById(id)
        .populate({
            path: 'items',
            select: 'name description startingPrice images',
        })
        .populate('registeredUsers', 'firstName companyName')
        
        // .populate('sellers', 'name image') // Populate sellers
        if (!auction) return res.status(404).json({ message: "Auction not found" });

        // Convert each item's image buffer to base64
        const auctionWithBase64Images = {
            ...auction._doc,
            items: auction.items.map(item => ({
                ...item._doc,
                images: item.images.map(image => ({
                    data: `data:${image.contentType};base64,${image.data.toString('base64')}`
                }))
            }))
        };

        res.status(200).json(auctionWithBase64Images);
    } catch (err) {
        res.status(500).json({ message: "Error fetching auction", error: err.message });
    }
});


  




  // Route to add item to auction
  router.route("/add-to-auction").post(async (req, res) => {
    const { auctionId, itemId } = req.body;

    try {
        const auction = await Auction.findById(auctionId);

        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        auction.items.push(itemId);

        await auction.save();

        res.status(200).json({
            message: "Item added to auction successfully",
            auction
        });
    } catch (err) {
        res.status(500).json({
            message: "Error adding item to auction",
            error: err.message
        });
    }
});




// Route to update an auction
router.route("/update/:id").put(async (req, res) => {
    const { id } = req.params;
    const { title, category, description, image } = req.body;

    try {
        const updatedAuction = await Auction.findByIdAndUpdate(id, {
            title,
            category,
            description,
            image
        }, { new: true });

        if (!updatedAuction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        res.status(200).json({
            message: "Auction updated successfully",
            auction: updatedAuction
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating auction",
            error: err.message
        });
    }
});

// Route to delete an auction
router.route("/delete/:id").delete(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAuction = await Auction.findByIdAndDelete(id);

        if (!deletedAuction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        res.status(200).json({
            message: "Auction deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting auction",
            error: err.message
        });
    }
});

module.exports = router;
