import unittest
import requests

class TestNginx(unittest.TestCase):
    
    def setUp(self):
        self.ip_address = 'localhost'
        self.url = 'http://{}:8080/'.format(self.ip_address)
    
    def test_status_code(self):
        response = requests.get(self.url)
        self.assertEqual(response.status_code, 200)
    
    def test_content(self):
        response = requests.get(self.url)
        expected_content = b'<title>Das Internetseite</title>'
        self.assertIn(expected_content, response.content)
    
if __name__ == '__main__':
    unittest.main()