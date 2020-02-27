class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.text :body
      t.boolean :disp_flg
      t.datetime :start
      t.datetime :end
      t.string :allDay
      t.timestamps
    end
    add_column :events, :user_id, :integer
  end
end
