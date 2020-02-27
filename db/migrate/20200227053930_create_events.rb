class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.integer   :user_id, index: true
      t.datetime :start
      t.datetime :end
      t.timestamps
    end

  end
end
