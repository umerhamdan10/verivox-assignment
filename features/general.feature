Feature: Privathaftpflicht calculator and tariff search

  Background: The user open the verivox and set the cookies
    Given I navigate to the base url
    And I wait for '2000' Milliseconds
    When I hover on the '#uc-btn-accept-banner' element
    And I click on the '#uc-btn-accept-banner' element
    And I wait for '2000' Milliseconds

    @QA-01
  Scenario: Verify the DSL calculator
    Given I open the url 'privathaftpflicht/'
    And I wait for '2000' Milliseconds
    When I enter '29' in input field '[name="age"]' element
    And I click on the '.calculator-form [type="submit"]' element
    And I wait until '[class="layout-column"]' element is visible
    Then The '[class="layout-column"]' element is visible in viewport
    When I enter '09.01.1994' in input field '[placeholder="TT.MM.JJJJ"]' element
    And I enter '13088' in input field '#prestep_postcode' element
    And I wait for '1000' Milliseconds
    And I click on the '[class="button"]' element
    And I wait for the page navigation to finish
    And I wait until '[class="product-container"]' element is visible
#    And I wait for '20000' Milliseconds
    Then The '[class="product-container"]' element is visible in viewport
    And The '[class="product-container"]' element is visible more than '5' times

  @QA-02 @only
  Scenario: Load multiple tariff result pages
    Given I open the url 'privathaftpflicht/'
    And I wait for '1000' Milliseconds
    When I enter '29' in input field '[name="age"]' element
    And I click on the '.calculator-form [type="submit"]' element
    And I wait until '[class="layout-column"]' element is visible
    Then The '[class="layout-column"]' element is visible in viewport
    When I enter '09.01.1994' in input field '[placeholder="TT.MM.JJJJ"]' element
    And I enter '13088' in input field '#prestep_postcode' element
    And I wait for '1000' Milliseconds
    And I click on the '[class="button"]' element
    And I wait for the page navigation to finish
    And I wait until '[class="product-container"]' element is visible
    Then The '[class="product-container"]' element is visible in viewport
    When I scroll to the '[class="more-products-button-wrapper"]' element
    And I wait for '1000' Milliseconds
    Then The '[class="more-products-button-wrapper"]' element is visible in viewport
    When I get the totall tariffs 'filtered-products-hint span'
    And The '.product-list product' element is visible '20' times
    When I can continue to load tariffs 'more-products-button span'
    Then The '.product-list product' element is visible 'countTariffs' times


  @QA-03
  Scenario: Verify offer details for a selected tariff
    Given I open the url 'privathaftpflicht/'
    And I wait for '1000' Milliseconds
    When I enter '29' in input field '[name="age"]' element
    And I click on the '.calculator-form [type="submit"]' element
    And I wait until '[class="layout-column"]' element is visible
    Then The '[class="layout-column"]' element is visible in viewport
    When I enter '09.01.1994' in input field '[placeholder="TT.MM.JJJJ"]' element
    And I enter '13088' in input field '#prestep_postcode' element
    And I wait for '1000' Milliseconds
    And I click on the '[class="button"]' element
    And I wait for the page navigation to finish
#    And I wait for '10000' Milliseconds
    And I wait until '[class="product-container"]' element is visible
    Then The '[class="product-container"]' element is visible in viewport
    And The '[class="price"]' element is visible in viewport
    When I click on the '[class="button-toggle"]' element by index 1
    And I wait for '2000' Milliseconds
    Then The text value of element '[class="navigation"] li[class='active']' includes 'Wich­tigs­te Leis­tun­gen'
    When I click on the '[class="navigation"] li' element by index 2
    Then The text value of element '[class="navigation"] li[class='active']' includes 'All­ge­mein'
    When I click on the '[class="navigation"] li' element by index 3
    Then The text value of element '[class="navigation"] li[class='active']' includes 'Tä­tig­kei­ten und Hob­bys'
    When I click on the '[class="navigation"] li' element by index 4
    Then The text value of element '[class="navigation"] li[class='active']' includes 'Miete & Im­mo­bi­li­en'
    When I click on the '[class="navigation"] li' element by index 5
    Then The text value of element '[class="navigation"] li[class='active']' includes 'Do­kumen­te'
    And The '.product-group-action [class="cta"] button:nth-child(2)' element is visible in viewport

