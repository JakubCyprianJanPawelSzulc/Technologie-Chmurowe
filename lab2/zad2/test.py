import unittest
import requests
from datetime import datetime

class Test(unittest.TestCase):

    def test_code(self):
        response = requests.get('http://localhost:8080/')
        self.assertEqual(response.status_code, 200)
    
    def test_content(self):
        response = requests.get('http://localhost:8080/')
        data=response.json()
        expected = (datetime.utcnow()).strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
        self.assertEqual(data['date'], expected)


        

if __name__ == '__main__':
    unittest.main()