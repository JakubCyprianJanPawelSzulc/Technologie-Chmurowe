import unittest
import requests
import json

class TestApp(unittest.TestCase):
    def setUp(self):
        self.url = "http://localhost:8080/"

    def test_mongodb_stats(self):
        response = requests.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn("db", data)
        self.assertIn("collections", data)
        self.assertIn("objects", data)

if __name__ == '__main__':
    unittest.main()