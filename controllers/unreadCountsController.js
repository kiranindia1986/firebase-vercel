const getUnreadCounts = async (req, res) => {
    const userId = req.params.userId;
    console.log(`UserID received: ${userId}`);

    try {
        console.log('Fetching notifications...');
        const notificationSnapshot = await db.collection('notification').get();
        console.log('Fetched notifications successfully.');

        const unreadNotificationsCount = notificationSnapshot.docs.filter((doc) => {
            const users = doc.data().users || [];
            return users.some((user) => user.id === userId && user.read === false);
        }).length;

        console.log(`Unread notifications count: ${unreadNotificationsCount}`);

        res.status(200).json({
            unreadNotifications: unreadNotificationsCount
        });
    } catch (error) {
        console.error('Error fetching unread counts:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUnreadCounts };
