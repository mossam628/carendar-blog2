class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title,null: false,
      t.datetime :start,null: false,
      t.datetime :end,null: false,
      t.timestamps
    end
    # add_column :events, :user_id, :integer
  end
end
