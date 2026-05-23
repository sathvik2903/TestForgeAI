from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

from webdriver_manager.chrome import ChromeDriverManager

import time

def test_crud():

    print("🚀 STARTING CRUD TEST")

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

    inputs = driver.find_elements(
        By.TAG_NAME,
        "input"
    )

    if len(inputs) >= 4:

        inputs[0].send_keys(
            "Pytest Automation"
        )

        inputs[1].send_keys(
            "Generated using pytest"
        )

        inputs[2].send_keys(
            "High"
        )

        inputs[3].send_keys(
            "Open"
        )

        buttons = driver.find_elements(
            By.TAG_NAME,
            "button"
        )

        buttons[1].click()

        print("✅ TESTCASE CREATED")

    else:

        print("❌ INPUTS NOT FOUND")

    time.sleep(5)

    driver.save_screenshot(
        "crud_test.png"
    )

    print("📸 SCREENSHOT SAVED")

    driver.quit()