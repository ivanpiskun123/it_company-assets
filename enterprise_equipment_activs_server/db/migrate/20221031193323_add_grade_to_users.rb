class AddGradeToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :grade, index: true
  end
end
