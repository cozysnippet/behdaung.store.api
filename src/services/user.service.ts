
export const userService = {
  async getUserById(id: string) {
    // Mock database logic
    const users = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
    ]
    
    return users.find(u => u.id === id) || null
  }
}