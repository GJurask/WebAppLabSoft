namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SampleInfo", "EditionDateTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SampleInfo", "EditionDateTime");
        }
    }
}
