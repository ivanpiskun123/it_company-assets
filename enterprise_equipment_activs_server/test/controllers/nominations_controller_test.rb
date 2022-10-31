require "test_helper"

class NominationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get nominations_index_url
    assert_response :success
  end
end
