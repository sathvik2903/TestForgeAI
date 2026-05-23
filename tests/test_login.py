from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

from webdriver_manager.chrome import ChromeDriverManager

import time

def test_login():

    print("🚀 STARTING LOGIN TEST")

    driver = webdriver.Chrome(
        service=Service(
            ChromeDriverManager().install()
        )
    )

    driver.maximize_window()

    driver.get("http://localhost:5173")

    time.sleep(2)

    email_input = driver.find_element(
        By.XPATH,
        '//input[@type="email"]'
    )

    password_input = driver.find_element(
        By.XPATH,
        '//input[@type="password"]'
    )

    email_input.send_keys(
        "admin@testforge.com"
    )

    password_input.send_keys(
        "123456"
    )

    login_button = driver.find_element(
        By.TAG_NAME,
        "button"
    )

    login_button.click()

    time.sleep(5)

    assert "dashboard" in driver.current_url.lower()

    print("✅ LOGIN TEST PASSED")

    driver.quit()