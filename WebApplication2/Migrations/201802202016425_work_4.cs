namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_4 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sample", "EditionDateTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sample", "EditionDateTime");
        }
    }
}
