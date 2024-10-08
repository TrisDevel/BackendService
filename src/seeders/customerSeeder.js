const Customer = require('../models/customer'); // Đường dẫn đến mô hình Customer

const seedCustomers = async () => {
    const customers = [
        {
            username: 'john_doe',
            password: 'hashed_password1', // Bạn nên mã hóa mật khẩu thực tế
            name: 'John Doe',
            email: 'john@example.com',
            phone_number: '0123456789',
            address: '123 Main St',
            loyalty_points: 10,
        },
        {
            username: 'jane_doe',
            password: 'hashed_password2', // Bạn nên mã hóa mật khẩu thực tế
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone_number: '0987654321',
            address: '456 Second St',
            loyalty_points: 20,
        },
        // Bạn có thể thêm nhiều khách hàng khác ở đây
    ];

    try {
        await Customer.bulkCreate(customers);
        console.log('Customers seeded successfully!');
    } catch (error) {
        console.error('Error seeding customers:', error);
    }
};

seedCustomers();
